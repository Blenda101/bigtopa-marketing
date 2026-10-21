import React, { useEffect, useMemo, useState } from 'react';
import { X, Plus, Trash2, Edit2, Check, ChevronLeft, ChevronRight, Search, Copy, Link, ExternalLink } from 'lucide-react';
import { useValueCalculator } from '../../context/ValueCalculatorContext';
import { App, SiteTheme } from '../../types';
import { EmbedCalculator, PAGE_BG, DEFAULT_ACCENT } from '../Embed/EmbedCalculator';
import { EMBED_CSS } from '../Embed/styles';

interface SiteManagementProps {
  onClose: () => void;
}

type Side = 'in' | 'out';

const toSlug = (label: string) =>
  label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const SiteManagement: React.FC<SiteManagementProps> = ({ onClose }) => {
  const {
    apps, sites, addSite, renameSite, deleteSite, setAppSites, updateSiteSettings,
    activeSiteId: activeId, setActiveSiteId: setActiveId, state,
  } = useValueCalculator();
  const [basePrice, setBasePrice] = useState('');
  const [perUserPrice, setPerUserPrice] = useState('');
  const [themeDraft, setThemeDraft] = useState<SiteTheme>('light');
  const [accentDraft, setAccentDraft] = useState(DEFAULT_ACCENT);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [search, setSearch] = useState<Record<Side, string>>({ in: '', out: '' });
  const [dragOver, setDragOver] = useState<Side | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<'embed' | 'link' | null>(null);

  const activeSite = sites.find((s) => s.id === activeId);

  useEffect(() => {
    setBasePrice(activeSite?.base_price?.toString() ?? '');
    setPerUserPrice(activeSite?.price_per_user?.toString() ?? '');
    setThemeDraft(activeSite?.theme ?? 'light');
    setAccentDraft(activeSite?.accent ?? DEFAULT_ACCENT);
    setSettingsSaved(false);
  }, [activeSite?.id, activeSite?.base_price, activeSite?.price_per_user, activeSite?.theme, activeSite?.accent]);

  const parsePrice = (v: string) => (v.trim() === '' ? NaN : parseFloat(v));

  const validAccent = /^#[0-9a-fA-F]{6}$/.test(accentDraft);

  const handleSaveSettings = () => {
    if (!validAccent) return setError('Accent must be a hex colour like #C4713A');
    const base = parsePrice(basePrice);
    const perUser = parsePrice(perUserPrice);
    if (!(base >= 0) || !(perUser >= 0)) return setError('Enter both prices (0 or more)');
    run(async () => {
      await updateSiteSettings(activeId, {
        base_price: base,
        price_per_user: perUser,
        theme: themeDraft,
        accent: accentDraft.toUpperCase(),
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 1500);
    });
  };

  const { inApps, outApps } = useMemo(() => {
    const match = (app: App, q: string) => app.name.toLowerCase().includes(q.toLowerCase());
    const inApps = apps.filter((a) => a.sites?.includes(activeId) && match(a, search.in));
    const outApps = apps.filter((a) => !a.sites?.includes(activeId) && match(a, search.out));
    return { inApps, outApps };
  }, [apps, activeId, search]);

  // Remounts the preview when membership changes so it refetches
  const memberKey = apps.filter((a) => a.sites?.includes(activeId)).map((a) => a.id).join(',');

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  const moveApps = (targets: App[], to: Side) =>
    run(async () => {
      for (const app of targets) {
        const current = app.sites || [];
        const next = to === 'in'
          ? Array.from(new Set([...current, activeId]))
          : current.filter((s) => s !== activeId);
        await setAppSites(app.id, next);
      }
    });

  const handleCreate = () => {
    const label = newLabel.trim();
    const id = toSlug(newSlug || label);
    if (!label || !id) return setError('Name cannot be empty');
    if (sites.some((s) => s.id === id)) return setError(`"${id}" already exists`);
    run(async () => {
      // New collections start with the current fallback prices
      await addSite({
        id,
        label,
        base_price: state.bigTopaPricing.base_price,
        price_per_user: state.bigTopaPricing.price_per_user,
      });
      setActiveId(id);
      setNewLabel('');
      setNewSlug('');
      setSlugTouched(false);
    });
  };

  const handleDelete = () => {
    if (!activeSite) return;
    if (!window.confirm(`Delete "${activeSite.label}"? Apps stay, but are removed from this site.`)) return;
    run(() => deleteSite(activeSite.id));
  };

  // Colours come from the saved collection settings, so links/snippets only need the ID
  const snippet = `<div data-bt-calculator data-site="${activeId}"></div>\n<script src="https://bt-value-calculator.netlify.app/embed.js"></script>`;
  const presentationLink = `${window.location.origin}/?site=${activeId}`;

  const copy = (text: string, which: 'embed' | 'link') => {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
  };

  const renderColumn = (side: Side, list: App[], title: string) => (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(side);
      }}
      onDragLeave={() => setDragOver(null)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(null);
        const app = apps.find((a) => a.id === e.dataTransfer.getData('text/plain'));
        const isIn = app?.sites?.includes(activeId);
        if (app && (side === 'in') !== !!isIn) moveApps([app], side);
      }}
      className={`flex flex-col rounded-lg border-2 transition-colors ${
        dragOver === side ? 'border-[#FD5108] bg-orange-50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h4 className="font-medium text-gray-800">
          {title} <span className="text-gray-400 font-normal">({list.length})</span>
        </h4>
        <button
          disabled={busy || list.length === 0}
          onClick={() => moveApps(list, side === 'in' ? 'out' : 'in')}
          className="text-xs text-[#FD5108] hover:underline disabled:text-gray-300 disabled:no-underline"
        >
          {side === 'in' ? 'Remove all' : 'Add all'}
        </button>
      </div>
      <div className="px-4 pt-3">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search[side]}
            onChange={(e) => setSearch((prev) => ({ ...prev, [side]: e.target.value }))}
            placeholder="Search apps"
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FD5108]"
          />
        </div>
      </div>
      <ul className="p-4 space-y-2 min-h-[240px] max-h-[420px] overflow-y-auto">
        {list.length === 0 && (
          <li className="text-sm text-gray-400 text-center py-8">
            {side === 'in' ? 'Drag apps here' : 'No apps left'}
          </li>
        )}
        {list.map((app) => (
          <li
            key={app.id}
            draggable={!busy}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', app.id)}
            onClick={() => !busy && moveApps([app], side === 'in' ? 'out' : 'in')}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-grab hover:border-[#FD5108] select-none"
          >
            {app.logo ? (
              <img src={app.logo} alt="" className="w-6 h-6 object-contain" />
            ) : (
              <div className="w-6 h-6 rounded bg-gray-200" />
            )}
            <span className="flex-1 text-sm text-gray-800">{app.name}</span>
            <span className="text-xs text-gray-400">{app.category}</span>
            {side === 'in' ? (
              <ChevronRight size={16} className="text-gray-400" />
            ) : (
              <ChevronLeft size={16} className="text-gray-400" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Sites &amp; Collections</h3>
        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
          <X size={20} />
        </button>
      </div>

      {/* Create */}
      <div className="mb-6 flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">New site / collection</label>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => {
              setNewLabel(e.target.value);
              if (!slugTouched) setNewSlug(toSlug(e.target.value));
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="e.g. AlumniHub"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FD5108]"
          />
        </div>
        <div className="w-48">
          <label className="block text-xs font-medium text-gray-600 mb-1">ID (data-site)</label>
          <input
            type="text"
            value={newSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setNewSlug(toSlug(e.target.value));
            }}
            placeholder="alumnihub"
            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#FD5108]"
          />
        </div>
        <button
          onClick={handleCreate}
          disabled={busy}
          className="flex items-center gap-2 bg-[#FD5108] hover:bg-[#E84A00] text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          <Plus size={18} />
          <span>Create</span>
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {/* Site picker */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sites.map((site) => {
          const count = apps.filter((a) => a.sites?.includes(site.id)).length;
          return (
            <button
              key={site.id}
              onClick={() => {
                setActiveId(site.id);
                setEditing(false);
              }}
              className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                site.id === activeId
                  ? 'border-[#FD5108] bg-orange-50 text-[#FD5108]'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              {site.label} <span className="opacity-60">· {count}</span>
            </button>
          );
        })}
      </div>

      {activeSite && (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {editing ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FD5108]"
                  autoFocus
                />
                <button
                  onClick={() =>
                    editValue.trim() &&
                    run(async () => {
                      await renameSite(activeSite.id, editValue.trim());
                      setEditing(false);
                    })
                  }
                  className="p-1.5 rounded-md hover:bg-gray-100 text-green-600"
                >
                  <Check size={18} />
                </button>
                <button onClick={() => setEditing(false)} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  Editing <strong>{activeSite.label}</strong>{' '}
                  <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{activeSite.id}</code>
                </span>
                <button
                  onClick={() => {
                    setEditValue(activeSite.label);
                    setEditing(true);
                  }}
                  className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
                  title="Rename"
                >
                  <Edit2 size={16} />
                </button>
                <button onClick={handleDelete} className="p-1.5 rounded-md hover:bg-gray-100 text-red-500" title="Delete">
                  <Trash2 size={16} />
                </button>
              </>
            )}
            <button
              onClick={() => copy(snippet, 'embed')}
              className="ml-auto flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-md"
            >
              <Copy size={14} />
              {copied === 'embed' ? 'Copied' : 'Copy embed code'}
            </button>
            <button
              onClick={() => copy(presentationLink, 'link')}
              className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-md"
            >
              <Link size={14} />
              {copied === 'link' ? 'Copied' : 'Copy presentation link'}
            </button>
            <a
              href={presentationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-md"
            >
              <ExternalLink size={14} />
              Open
            </a>
          </div>

          <div className="mb-5 flex flex-wrap items-end gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Theme</label>
              <div className="flex rounded-md border border-gray-300 overflow-hidden">
                {(['light', 'dark', 'white'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setThemeDraft(t)}
                    className={`px-3 py-1.5 text-sm capitalize transition-colors ${
                      themeDraft === t ? 'bg-[#FD5108] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Accent colour</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={validAccent ? accentDraft : DEFAULT_ACCENT}
                  onChange={(e) => setAccentDraft(e.target.value.toUpperCase())}
                  className="h-8 w-10 p-0.5 border border-gray-300 rounded-md cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={accentDraft}
                  onChange={(e) => setAccentDraft(e.target.value.trim())}
                  className={`w-24 px-2 py-1.5 border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-[#FD5108] ${
                    validAccent ? 'border-gray-300' : 'border-red-400'
                  }`}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Price per user ($/annually)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                placeholder="e.g. 100"
                className="w-44 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FD5108]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Price per user ($/monthly)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={perUserPrice}
                onChange={(e) => setPerUserPrice(e.target.value)}
                placeholder="e.g. 10"
                className="w-44 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FD5108]"
              />
            </div>
            <button
              onClick={handleSaveSettings}
              disabled={busy}
              className="px-4 py-1.5 bg-[#FD5108] hover:bg-[#E84A00] text-white text-sm rounded-md transition-colors disabled:opacity-50"
            >
              {settingsSaved ? 'Saved' : 'Save settings'}
            </button>
            <p className="text-xs text-gray-500 basis-full">
              The preview below shows unsaved colours; prices apply after saving.
            </p>
          </div>

          <p className="text-xs text-gray-500 mb-3">
            Drag apps between columns, or click an app to move it.
          </p>

          <div className={`grid md:grid-cols-2 gap-4 ${busy ? 'opacity-70 pointer-events-none' : ''}`}>
            {renderColumn('in', inApps, `In ${activeSite.label}`)}
            {renderColumn('out', outApps, 'Available apps')}
          </div>

          <h4 className="mt-8 mb-3 font-medium text-gray-800">Preview</h4>
          <style>{EMBED_CSS}</style>
          <div className="rounded-lg border border-gray-200 overflow-hidden" style={{ background: PAGE_BG[themeDraft] }}>
            <EmbedCalculator
              key={`${activeId}:${memberKey}:${activeSite.base_price}:${activeSite.price_per_user}`}
              siteId={activeId}
              theme={themeDraft}
              accent={validAccent ? accentDraft : DEFAULT_ACCENT}
              surface
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SiteManagement;
