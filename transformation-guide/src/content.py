# Content source for the Digital Transformation Architecture eBook.
# Markup: **bold**  *italic*  [[BigTopa words|GreekHouse words]]  {{05}} = link to chapter 05
# Feature status: 'now' = Available, 'next' = Coming  (confirm every one before publishing)

ELEMENTS = {
    "01": {"title": "Culture", "eyebrow": "Aligned", "slug": "culture",
           "question": "Why do we exist, and which outcomes matter most?"},
    "02": {"title": "Process", "eyebrow": "Governed", "slug": "process",
           "question": "How do we make decisions and keep the space safe?"},
    "03": {"title": "Data", "eyebrow": "Trusted", "slug": "data",
           "question": "Do members trust us with what we know about them?"},
    "04": {"title": "Unification", "eyebrow": "Integrated", "slug": "unification",
           "question": "Are our people and tools in one place?"},
    "05": {"title": "Fit", "eyebrow": "Adaptive", "slug": "fit",
           "question": "Do members have the right tools for this moment, no more and no less?"},
    "06": {"title": "Flow", "eyebrow": "Relevant", "slug": "flow",
           "question": "Do people, content and communications move to where they're needed?"},
    "07": {"title": "Feel", "eyebrow": "Connected", "slug": "feel",
           "question": "Does the space feel like home?"},
    "08": {"title": "Intelligence", "eyebrow": "Learning", "slug": "intelligence",
           "question": "Is the space learning what works, and getting better?"},
}

ICON_DOT = '<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="6" fill="#2f9e5b"/></svg>'
ICON_BARS = ('<svg width="22" height="16" viewBox="0 0 16 12" fill="#2f9e5b"><rect x="0" y="4" width="3" height="4" rx="1"/>'
             '<rect x="4.5" y="1" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="6" rx="1"/>'
             '<rect x="13" y="5" width="3" height="2" rx="1"/></svg>')
ICON_EYE = ('<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            'stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>'
            '<circle cx="12" cy="12" r="3"/></svg>')
ICON_BELL = ('<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
             'stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>'
             '<path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>')

MCMILLAN = ("McMillan, D. W., & Chavis, D. M. (1986). Sense of community: A definition and theory. "
            "*Journal of Community Psychology, 14*(1), 6–23.")

CHAPTERS = {}

# ---------------------------------------------------------------- 01 CULTURE
CHAPTERS["01"] = {
    "hero": "Tools amplify whatever culture they're given. Decide what you want amplified first.",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "Without a shared why, every tool becomes another argument.",
         "blocks": [
             ("p", "Most [[organizations|chapters]] can recite their mission. Fewer can name the three outcomes that matter most this year, with a number for each and a person who owns it. When outcomes are fuzzy, technology decisions become personal preference: one [[leader|officer]] wants a new app, another wants the old spreadsheet, and members get a different experience every time leadership changes."),
             ("p", "Roles make it worse. Many traditional roles were built around tasks that technology has since absorbed, like typing minutes or mailing letters. The tasks shrink, the titles stay, and nobody owns the outcomes that actually move the group forward."),
             ("table", ["If this sounds familiar", "It usually means"], [
                 ["New leadership changes the tools every year.", "The tools follow people, not outcomes."],
                 ["Meetings fill up with status updates.", "Roles are staffed to tasks, not results."],
                 ["\"Engagement is down,\" but nobody can say by how much.", "Outcomes were never given a number."],
                 ["The same five people do everything.", "Ownership isn't clear, so it isn't shared."],
             ]),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "Name the outcomes, then staff them.",
         "blocks": [
             ("p", "Healthy [[organizations|chapters]] agree on a short list of outcomes, give each one a number, and give each one an owner. For member organizations, the outcomes fall under three levers: **engagement** (members stay connected), **marketing** (the right message reaches the right people) and **monetization** (dues, donations, tickets and sponsorships fund the mission)."),
             ("h3", "The four hats"),
             ("p", "A practical way to staff those outcomes is four hats, worn alongside whatever titles your [[governing documents|bylaws]] require:"),
             ("cards", [
                 ("Engagement Lead", "Owns whether members stay connected and active between the big events."),
                 ("Marketing Lead", "Owns whether the right message reaches the right people, inside and outside the group."),
                 ("Monetization Lead", "Owns whether dues, donations, tickets and sponsorships fund the mission."),
                 ("Fit & Flow Engineer", "Keeps the system healthy: clean data, the right tools turned on, and a scoreboard for each lever. A volunteer role, not a hire."),
             ]),
             ("callout", "**Don't staff the tasks. Staff the outcomes.** Governance roles such as president and treasurer stay exactly as your [[governing documents|bylaws]] define them. The hats sit alongside them, so outcomes have owners no matter who holds which title."),
             ("h3", "Culture members can see"),
             ("p", "Culture lives in language and ritual as much as in goals. The words a space uses tell members whether it was built for them: [[families, age groups, programs and signature events|brothers or sorors, lines, service and Founders' Day]]. Rituals members can count on, weekly, monthly or each season, give the culture a rhythm."),
             ("seealso", "Connected elements", "The words and tools a space shows are set by {{05}}. Rituals that bring members together are covered in {{07}}."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "Your mission shapes the space, not the other way around.",
         "blocks": [
             ("features", [
                 ("Spaces built around your programs", "Spaces and rooms for committees, programs, events and [[member groups|lines]], each with its own conversations, meetups and files."),
                 ("Your vocabulary", "Roles, programs and events named in your group's own words."),
                 ("Four hats at onboarding", "Setup prompts you to assign the four hats at launch, whatever your current titles."),
                 ("Outcome scoreboards", "Each lever gets a live scoreboard, so leadership sees whether outcomes are moving."),
             ]),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "Can your [[leadership team|exec board]] name the top three outcomes for this year, with a number for each?",
                 "Who owns engagement? Marketing? Monetization (dues, donations and fundraising)? One person each, or everyone and no one?",
                 "Which roles are still staffed to tasks that technology now handles?",
                 "When leadership changes, what carries over: the outcomes, or just the passwords?",
                 "What words do your members use that your tools don't?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Outcomes with an owner and a number.",
         "blocks": [
             ("signal", "1+1", "The share of this year's goals that have one named owner and one measurable target.",
              "Aim for every goal. A goal without both is a wish, and wishes don't survive a leadership change."),
             ("p", "Watching whether those numbers move, month to month, is the job of {{08}}."),
         ]},
    ],
    "connected": [
        ("05", "The mission decides what \"the right tools\" are. A group built around service needs different spaces than one built around networking."),
        ("02", "Decisions, rules and roles put the culture into practice every day."),
        ("08", "Scoreboards show whether the outcomes you named are actually moving."),
    ],
}

# ---------------------------------------------------------------- 02 PROCESS
CHAPTERS["02"] = {
    "hero": "Rules aren't the opposite of community. They're what lets people relax.",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "When nobody knows the rules, the loudest voice sets them.",
         "blocks": [
             ("p", "Group chats have no [[governing documents|bylaws]]. Anyone can post anything, nobody is clearly in charge of keeping the peace, and when a thread turns ugly the only tools are leaving the group or deleting the chat. [[Leaders|Officers]] end up moderating by private text message, inconsistently and late at night."),
             ("p", "Decisions suffer too. Votes happen in a thread half the members never saw, results live in someone's notes, and the next [[leadership team|exec board]] can't find what was decided or why."),
             ("table", ["Without process", "What members feel"], [
                 ["No posted guidelines", "Unsure what's okay to say"],
                 ["Moderation by private text", "Rules depend on who's watching"],
                 ["Deleting instead of hiding", "Evidence disappears; disputes reopen"],
                 ["Votes in a chat thread", "Decisions feel rushed or forgotten"],
                 ["One set of rules for every space", "Either too strict for socializing or too loose for official business"],
             ]),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "Clear rules, fair moderation, decisions on the record.",
         "blocks": [
             ("p", "Healthy groups write their rules down, apply them the same way every time, and keep a record. Good process is mostly invisible: members feel it as calm, not as policing."),
             ("cards", [
                 ("Clear guidelines", "Posted where members can find them, in plain language, matching how the space is actually set up."),
                 ("Consistent response", "The same report gets the same response, whoever is on duty."),
                 ("Hide, don't delete", "Problem posts are hidden from members but kept for review, so decisions can be checked later."),
                 ("Escalation", "Moderators handle the everyday. Leadership handles the serious."),
             ]),
             ("h3", "Moderation that fits the space"),
             ("p", "A social space, an official business meeting and a program for young members need different rules. Moderation should adapt to each space and audience instead of applying one blunt setting everywhere. It also keeps the space tidy, archiving dead rooms and stale threads so clutter doesn't build up."),
             ("p", "Private features need guardrails too. Side conversations such as notes, whispers and huddles can be reported to moderators, nothing private is recorded without everyone's consent, and in spaces with members under 18, private one-on-one features between adults and minors are turned off."),
             ("h3", "Roles with the right reach"),
             ("p", "Not everyone needs the same powers. Admins set policy, organizers and facilitators run their spaces, and moderators keep community and event spaces healthy. [[In organizations with local chapters, the parent organization can set moderation templates that local groups inherit.|Your national or international headquarters can set moderation templates that chapters inherit, the same way bylaws flow down.]]"),
             ("seealso", "Connected elements", "Feeling safe is part of feeling at home; see {{07}}. Rules also decide who can message whom, which shapes {{06}}."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "The Moderation Mixer.",
         "blocks": [
             ("p", "Moderation works like a sound mixer: sliders for content, behavior, privacy and community standards, each set in clear steps rather than by a hidden algorithm. Set it once for a space and it applies consistently, whoever is on duty."),
             ("features", [
                 ("Space roles and permissions", "Owners and admins control who can create rooms, invite members and publish."),
                 ("Moderation tools", "Hide posts, mute or remove participants, and review reports, with nothing deleted outright."),
                 ("Moderation Mixer", "Sliders that set how strict each space is, with steps you can explain to members."),
                 ("Generated guidelines", "Community guidelines written from your mixer settings and saved where members can find them."),
                 ("Templates passed down", "[[The parent organization sets|Your national or international headquarters sets]] moderation templates; [[local groups|chapters]] inherit them."),
             ]),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "Where are your group's rules written down, and could a new member find them in under a minute?",
                 "Who handles a complaint at 11 p.m. on a Saturday?",
                 "When a post crosses the line, is it hidden and recorded, or deleted and forgotten?",
                 "Does your official business space follow different rules than your social space? Should it?",
                 "Can next year's [[leadership team|exec board]] find what this year's [[leadership team|exec board]] decided, and why?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Time to resolve a report.",
         "blocks": [
             ("signal", "↓", "The typical time between a member reporting a problem and a moderator resolving it.",
              "When it falls, members can trust that someone is watching. When it rises, it's an early warning, before members start leaving quietly."),
         ]},
    ],
    "connected": [
        ("07", "Clear rules and fair moderation make members feel safe enough to relax, talk and stay."),
        ("01", "Process is culture in practice: how decisions get made and who makes them."),
        ("03", "Privacy rules decide who can see members' information, and that's where trust starts."),
    ],
}

# ---------------------------------------------------------------- 03 DATA
CHAPTERS["03"] = {
    "hero": "Members share what they trust you to protect.",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "Member data is scattered, stale and hard to trust.",
         "blocks": [
             ("p", "Most [[organizations|chapters]] keep member information in four or five places: a [[parent organization's|national]] roster, a spreadsheet from the last treasurer, a payment app, a group chat's member list and an event sign-up form. Each holds a different piece of the same person, and none of them agree. [[For organizations with chapters, local, regional and national records rarely line up.|For graduate chapters, local, regional and national records rarely line up.]]"),
             ("p", "Members notice. They get the wrong name on an email, a dues reminder after they've paid, an invitation for a city they left years ago. And they're right to hesitate before sharing more: in a group chat, everyone can see their phone number."),
             ("table", ["The problem", "What it costs"], [
                 ["The same member in four systems", "Nobody knows which record is right."],
                 ["Contact details visible to everyone", "Members share less, or leave."],
                 ["Stale emails and addresses", "Messages bounce and members drift."],
                 ["Spreadsheets emailed between [[leaders|officers]]", "Information leaks at every handoff."],
             ]),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "One trusted record, with members in control.",
         "blocks": [
             ("p", "Healthy groups keep one record per member, built from the best of every source: the official membership details from [[the parent organization|national]], the dues history from the treasurer, and the member's own current phone number. Then they hand control of visibility to the member."),
             ("cards", [
                 ("One record per member", "Duplicates merged, with the most reliable source winning for each detail."),
                 ("Members control visibility", "Name and photo are visible to verified members. Phone, email and address are each hidden by default and shared only if the member chooses."),
                 ("Verified members only", "Directories show real, verified members, with no anonymous accounts and no bulk exports of contact details."),
                 ("Cleanup as a welcome", "Consolidating member data happens as a guided step when your [[organization|chapter]] sets up its space, not a project nobody finishes."),
             ]),
             ("callout", "**Complete profiles are the first act of engagement.** A real photo and a current city turn a roster into a community members can actually find. And completing a profile is not the same as publishing your life: members decide what's shared."),
             ("seealso", "Connected elements", "Trusted data is what {{08}} learns from, and it's how {{06}} knows where to send things."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "Your members' information, cleaned up and protected.",
         "blocks": [
             ("features", [
                 ("Separate, protected data", "Each [[organization|chapter]]'s data is kept separate from every other, and access is checked on every request."),
                 ("Profiles with privacy controls", "Verified profiles where contact details are hidden by default and shared only by choice."),
                 ("Member directory", "Search by name, city and [[member group|line or initiation year]], showing only what members have chosen to share."),
                 ("Guided data cleanup", "Bring your rosters and spreadsheets; duplicates are merged into one record per member as part of setup."),
             ]),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "How many places does a member's phone number live today?",
                 "If a member changed their email, how many records would someone have to fix?",
                 "Who can see members' phone numbers in your group chat right now?",
                 "When [[a leader|an officer]] steps down, does a spreadsheet of member data leave with them?",
                 "How many of your members have a real photo on their profile?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Profile completion rate.",
         "blocks": [
             ("signal", "%", "The share of members with a complete profile:",
              "a real photo, a current city and [[their membership details|chapter details such as line and initiation year]]. It only rises when members trust the space enough to share."),
         ]},
    ],
    "connected": [
        ("08", "You can only learn from what members trust you with. Data earns the trust; Intelligence turns it into insight."),
        ("02", "Privacy rules and access controls are process applied to members' information."),
        ("06", "Clean, current records are how messages and invitations reach the right people."),
    ],
}

# ---------------------------------------------------------------- 04 UNIFICATION
CHAPTERS["04"] = {
    "hero": "Stop stitching tools together. Move into one home.",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "Every tool switch costs context.",
         "blocks": [
             ("p", "Chat in one app, events in another, dues in a third, files in a fourth. Each was a reasonable choice on its own. Together they're a patchwork: members juggle a handful of logins, [[leaders|officers]] copy the same information between systems, and decisions made in one tool never reach the people in another."),
             ("p", "Connecting the apps doesn't fix it. Integrations pass data around, but the experience still feels like five apps, because it is."),
             ("callout", "**There's no such thing as a free app.** A $0 tool still gets paid: with your [[organization's|chapter's]] data, which lives on someone else's terms ({{03}}); with [[leader|officer]] hours spent copying between systems; and with members who tune out or miss what matters because it lives somewhere else ({{07}}). As you use the calculator below, count those costs too."),
             ("calculator", "Select the tools your [[organization|chapter]] uses today to see what one home could replace."),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "One home, built in, not bolted on.",
         "blocks": [
             ("p", "Healthy groups run their life from one place: conversations, meetings, events, files, giving and the member directory, all sharing the same members, the same permissions and the same history. Moving from a conversation to a meeting to a payment is a change of mode, not a change of app."),
             ("cards", [
                 ("One login", "Members sign in once to everything the group does."),
                 ("One member list", "Everyone, their roles and their permissions, in one place."),
                 ("One history", "A decision, the meeting it came from and the file it produced stay connected."),
                 ("Native, not stitched", "Core tools are built in. Outside connections, such as payment processing, are the exception, not the glue."),
             ]),
             ("h3", "One hub for each [[group|chapter]]"),
             ("p", "The home has a name: the **hub**. Every [[group|chapter]] has one, and everything else lives inside it: ongoing **spaces** for its main areas, smaller **rooms** inside them, and **meetups** that come and go. [[In organizations with local chapters, the national organization, each region and each chapter|Your national or international headquarters, your region and your chapter]] each have their own hub, connected so that what matters can move between them ({{06}})."),
             ("h3", "People are part of unification"),
             ("p", "Unification isn't only about tools. It's [[leaders|officers]], committees and members working from the same picture. That's why clear owners for each outcome ({{01}}) and one shared scoreboard ({{08}}) matter as much as one login."),
             ("callout", "**One home doesn't mean everything on every screen.** Unification brings everything under one roof; {{05}} decides what shows up in each space."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "The core tools, together.",
         "blocks": [
             ("features", [
                 ("Stream", "Conversations and announcements, threaded, with reactions and rich media."),
                 ("Meetups", "Instant calls, scheduled meetings, webinars and broadcasts, without a separate video app."),
                 ("Shelves and blogs", "Files and posts that live alongside the conversations they came from."),
                 ("Direct messages", "One-on-one and small-group conversations in the same place as everything else."),
                 ("Events and ticketing", "RSVPs, tickets and capacity for [[programs and galas|step shows, banquets and Founders' Day]]."),
                 ("One checkout", "Dues, donations, tickets and products in one place, with no platform cut on member revenue. Standard payment processing fees apply."),
                 ("Marketing tools", "Email, announcements and event pages that reach the right members."),
             ]),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "How many apps does a member need to stay fully involved in a typical month?",
                 "How many logins does a new [[leader|officer]] inherit?",
                 "Where does a decision made in a meeting get recorded, and who sees it?",
                 "What do [[leaders|officers]] copy by hand from one tool to another?",
                 "Which app would members miss least if it disappeared tomorrow?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Apps it takes to run a month.",
         "blocks": [
             ("signal", "#", "Count the separate apps members and [[leaders|officers]] need in a typical month:",
              "chat, meetings, events, payments, files and email. Watch it fall. Every app removed is one fewer login and one fewer place for things to get lost."),
         ]},
    ],
    "connected": [
        ("05", "One home, but not every tool shown at once. Fit decides what appears in each space."),
        ("06", "With everything in one home, activity flows naturally from rooms to spaces to the hub, and from hub to hub across the [[organization|fraternity or sorority]]."),
        ("01", "Unifying people means clear owners for each outcome, not just one login."),
    ],
}

# ---------------------------------------------------------------- 05 FIT
CHAPTERS["05"] = {
    "hero": "Tailored, not off the rack.",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "Too many tools overwhelm. Too few underwhelm.",
         "blocks": [
             ("p", "Most platforms are built for everyone, which means they're built for no one in particular. Enterprise tools bury a [[small organization|chapter]] in features it will never use. Consumer apps miss what it needs, like dues, elections or [[member groups|lines]], so members fill the gaps with yet another app."),
             ("scale", "Off the rack doesn't fit anyone.", [
                 "When members can't find what they need, or can't ignore what they don't, they stop opening the app. The goal is the middle: the right tools for this group, at this stage, on this screen.",
             ], [
                 ("Overwhelmed", "Every feature, on every screen, for everyone.", False),
                 ("Tailored", "The right tools for this group, at this stage.", True),
                 ("Underwhelmed", "The tools members need are missing.", False),
             ]),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "A space that feels made for you.",
         "blocks": [
             ("p", "Fit means the space adapts to its group at every level, the way a tailored suit is cut for one person:"),
             ("cards", [
                 ("The kind of group", "The tools, words and defaults match the kind of organization you are."),
                 ("The space", "A committee's work space, a member community space, an event space and a one-on-one space for coaching or mentoring each show different tools."),
                 ("The moment", "In a one-on-one call, hand-raising disappears. In a webinar, it appears. The interface changes with the activity."),
                 ("The relationship", "As members move from visitor to regular to [[leader|committee chair or officer]], the space opens up to them."),
             ]),
             ("h3", "Fit starts with the spaces you open"),
             ("p", "A [[group|chapter]] opens the spaces it actually needs, with rooms inside them, instead of inheriting someone else's layout. [[A youth-serving organization might open a Programs space with a room for each age group, a Members space, and a Foundation space with a room for its board.|A graduate chapter might open a Programs space with a room for each mentoring program, a Lounge with rooms by line or generation, and a Foundation space with a room for its board.]] As the [[group|chapter]] changes, spaces and rooms are added or retired."),
             ("h3", "Layouts that fit the content"),
             ("p", "Fit applies to layout too. When a shelf or blog holds only a few items, it sits compactly beside the conversation. As it grows, it expands into a full browsing view. How much of something exists decides how much space it gets."),
             ("h3", "It keeps fitting"),
             ("p", "A group of 12 and a group of 400 need different spaces, and most groups change size over time. Fit adapts as the community grows and relationships deepen, so the suit still fits next year."),
             ("seealso", "Connected elements", "Fit is what makes {{07}} possible. The mission that decides the right tools is set in {{01}}."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "Fit is built into how every space is put together.",
         "blocks": [
             ("features", [
                 ("Spaces you choose", "Open the spaces and rooms your [[group|chapter]] needs, and add or retire them as it changes."),
                 ("Space types", "Work, community, event and provider spaces (one-on-one services such as coaching or mentoring), each with its own conversations, roles, meetups and tools."),
                 ("Meetup types", "Instant calls through to broadcasts, turned on or off for each space."),
                 ("Adaptive layouts", "Shelves and blogs resize to how much they hold."),
                 ("Space settings", "Turn tools on or off for each space, and decide who can do what there."),
                 ("Plans built from features", "Plans are assembled feature by feature, so a group gets exactly what it needs and nothing it doesn't."),
                 ("Your vocabulary", "Roles, programs and events named in your group's own words."),
             ]),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "Which features in your current tools has nobody used in the last six months?",
                 "What do members still do in a separate app because your main tool can't?",
                 "Does your committee space look different from your social space? Should it?",
                 "How long does it take a brand-new member to do one useful thing?",
                 "Has your setup changed since your group grew, or shrank?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Time to first contribution.",
         "blocks": [
             ("signal", "→", "How long it takes a new member to do one meaningful thing after joining:",
              "RSVP, post, give or join a meetup. A space that fits shortens it. A space that overwhelms or underwhelms stretches it."),
         ]},
    ],
    "connected": [
        ("07", "Right-sized tools prevent overwhelm and underwhelm, so the space feels made for you."),
        ("04", "Unification brings everything under one roof; Fit decides what shows up in each space."),
        ("08", "What the space learns adjusts the fit over time, as the community grows."),
    ],
}

# ---------------------------------------------------------------- 06 FLOW
CHAPTERS["06"] = {
    "hero": "The right thing, in the right place, at the right moment.",
    "hero_visual": "flowmap",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "Important things get buried. Unimportant things get broadcast.",
         "blocks": [
             ("p", "In most group tools, everything lands in one stream. The dues deadline sits between a meme and a birthday wish. The file from last month's meeting is somewhere above 300 messages. Announcements go to everyone because there's no way to reach only the people who need them, so members learn to ignore all of it."),
             ("table", ["What happens", "Why"], [
                 ["Members miss the one message that mattered.", "Everything has the same weight."],
                 ["The same question gets asked every week.", "Answers don't stay findable."],
                 ["[[Leaders|Officers]] repeat announcements in five places.", "Nothing moves between groups on its own."],
                 ["Committee work never reaches [[leadership|the exec board]] unless someone forwards it.", "Activity stays wherever it happened."],
                 ["Members leave over notification overload.", "Every message is a summons."],
             ]),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "Digital feng shui.",
         "blocks": [
             ("p", "In feng shui, harmony comes from how energy moves through a space. Flow applies the same idea to attention: people, content and communications move to where they belong, and stay out of the way otherwise."),
             ("h3", "Natural, not mechanical"),
             ("p", "Flow isn't a set of rules or automations someone has to build and maintain. It follows the way information already moves among people: a committee's work flows up to [[leadership|the exec board]], the notes and photos from a meetup land back where it was held, and a [[region's|region's]] invitation reaches every [[local group|chapter]] beneath it. Because it's built into how spaces relate to each other, it works from day one, without setup."),
             ("callout", "**Broadcasting isn't flow.** [[Leaders|Officers]] can still post one announcement to every space at once. That's distribution: a deliberate choice, and sometimes the right one. Flow is what happens without anyone pushing."),
             ("h3", "Inside a [[group|chapter]]: rooms, spaces and the hub"),
             ("p", "Everything a [[group|chapter]] uses is a digital space. The **hub** is its home. **Spaces** are its main areas, **rooms** are the smaller groups inside them, and **meetups** are gatherings that start and end. Hubs, spaces and rooms are always there; meetups come and go."),
             ("cards", [
                 ("Activity flows up", "Activity flows up from rooms to spaces to the hub, so [[leaders|the exec board]] see what's happening without asking for reports."),
                 ("Meetups come home", "What a meetup produces, from notes to photos to follow-ups, flows back to the hub, space or room it started from."),
                 ("Folders move every way", "Files in folders flow in every direction, so they're where everyone expects them."),
                 ("Shelves choose their flow", "Each shelf of resources flows up, down, both ways or stays put. A committee's working notes stay in its room; [[organization-wide|chapter-wide]] forms appear on every shelf below."),
             ]),
             ("h3", "Across the [[organization|fraternity or sorority]]: hub to hub"),
             ("p", "[[In organizations with local chapters, every chapter has a hub, and so do its region and the national organization.|Every chapter has a hub, and so do its region (or province) and national or international headquarters.]] Flow between them runs hub to hub. It never reaches into another [[group's|chapter's]] spaces or rooms, so each [[group's|chapter's]] inner life stays its own."),
             ("cards", [
                 ("Down", "A region invites all of its [[local groups|chapters]] to a meetup, or posts to its blog for all of them."),
                 ("Up", "A [[local group|chapter]] submits a post to the national blog for publishing. Members, and credit for the money they raise, roll up from [[local group|chapter]] to region to national."),
                 ("Sideways", "[[Local groups|Chapters]] collaborate by invitation: one proposes a co-hosted meetup or a shared post, and the other accepts."),
             ]),
             ("p", "[[A local group that sponsors a student or youth group|An alumni chapter that advises undergraduate chapters]] stays connected to [[it|them]] and can collaborate freely, while [[each group|each undergraduate chapter]] still belongs to its own region."),
             ("p", "What flows is more than posts: **people** (members, donors, attendees, shoppers and sponsors), **content**, **communications** and **money**, each moving the way it naturally would."),
             ("h3", "Just in time"),
             ("p", "Flow also respects each member's attention. Members should find what they need at the moment they need it, without hunting:"),
             ("cards", [
                 ("Back to the source", "Any reply links back to the conversation it came from, so nobody scrolls to find context."),
                 ("Since you were last here", "A personal recap on arrival: what changed with your people."),
                 ("Live summaries", "Tap and hold, or hover, on an active space to see what's happening without going in."),
                 ("Signal Mixer", "Mute, pause, digest or elevate any space, person or topic, right from a message. Each member sets their own dial."),
             ]),
             ("seealso", "Connected elements", "How arriving feels is covered in {{07}}. Who can message whom is governed by {{02}}."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "Flow is built into how spaces connect.",
         "blocks": [
             ("features", [
                 ("Hub, spaces, rooms and meetups", "A structure that mirrors your [[organization|chapter]], from the whole group down to each committee, [[program|line]] and gathering."),
                 ("Meetups that come home", "A meetup's notes, photos and follow-ups land back where it started."),
                 ("Shelf and folder flow", "Folders flow every way; each shelf flows up, down, both ways or stays put."),
                 ("Connected hubs", "[[Local, regional and national|Chapter, regional and national]] hubs linked, so invitations, posts, members and giving credit move between them."),
                 ("Submit to national", "[[Local groups|Chapters]] submit posts to the national blog, and national decides what to publish."),
                 ("Collaboration requests", "[[Local groups|Chapters]] propose co-hosted meetups and shared posts; the other side accepts."),
                 ("Back to the source", "Replies and shared items keep a link to where they started."),
                 ("Arrival recap", "\"Since you were last here,\" personal to each member."),
                 ("Live space summaries", "What's happening now, without going in."),
                 ("Signal Mixer", "Mute, pause, digest or elevate any space, person or topic, right from a message."),
             ]),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "Where does your most important announcement live a week after you post it?",
                 "How many places do [[leaders|officers]] post the same message?",
                 "Does committee work reach [[leadership|the exec board]] on its own, or only when someone forwards it?",
                 "When your region or national hosts something, how do members find out?",
                 "When a member comes back after a month away, what do they see first?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Reach of key updates.",
         "blocks": [
             ("signal", "2 days", "The share of members who see an important update within two days of it being posted.",
              "If it's low, the update was buried or posted in the wrong place. If it rises while total notifications fall, flow is working."),
         ]},
    ],
    "connected": [
        ("07", "Arriving at what matters in seconds is what makes a space feel alive."),
        ("02", "Rules decide who can message whom, and what reaches members right away."),
        ("03", "Clean, current records keep each member connected to the right hub, spaces and rooms, so flow reaches them."),
    ],
}

# ---------------------------------------------------------------- 07 FEEL (carried over from the sample chapter)
CHAPTERS["07"] = {
    "hero": "People don't leave [[organizations|chapters]]. They drift away from ones that stopped feeling like home.",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "Digital spaces were built for attention and meetings, not belonging.",
         "blocks": [
             ("p", "Since 2020, many members have grown wary of commitments that require showing up in person. At the same time, they're worn out by video calls, and their phone has become the center of their attention. So [[organizations|chapters]] move more of their life online, into group chats and video meetings, and wonder why participation keeps thinning."),
             ("p", "The tools aren't neutral. Video fatigue is a design problem, not a people problem. Stanford researcher Jeremy Bailenson traced it to four causes: constant close-up eye contact, staring at your own face, being stuck in one spot, and the extra effort of reading cues through a screen. Group chats have the opposite problem. They're always on and never personal, so members mute them."),
             ("p", "Sociologist Ray Oldenburg called the barbershop, the corner café and the neighborhood diner \"third places\": the spaces between home and work where community happens. They quietly do jobs that most digital spaces drop:"),
             ("table", ["What in-person space does", "What most digital space does instead"], [
                 ["**Ambient presence.** You see who's around without having to talk.", "Binary: offline, or on a call."],
                 ["**The edge of the room.** You can listen before you join in.", "Post, or be invisible."],
                 ["**Easy in, easy out.** Drift in, slip out.", "Joining a call is a commitment; leaving is conspicuous."],
                 ["**Small circles.** A room of 60 splits into tables of five.", "One thread of 300 messages."],
                 ["**Recognition.** People notice you came and remember you.", "Contributions scroll away."],
                 ["**Rhythm.** Rituals, seasons, a before and an after.", "An endless \"now.\""],
                 ["**Invitation.** \"Come by if you can.\"", "Notifications that summon and guilt."],
             ]),
             ("p", "That gap is the third F: **fatigue**. Members don't stop caring. They stop opening the app."),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "Don't copy the room. Do what the room does, plus what only digital can do.",
         "blocks": [
             ("p", "Imitating in-person space with avatars, virtual rooms and headsets has been tried, and most groups haven't stuck with it. The goal isn't to make a phone feel like a building. It's to meet the same human needs the building meets, in a form that fits in a pocket, and to make the next in-person gathering more likely, not less."),
             ("p", "Research on community points to the same needs. Psychologists David McMillan and David Chavis proposed four elements of a sense of community: **membership** (I belong here), **influence** (I matter here), **fulfillment of needs** (I get something here) and **shared emotional connection** (we've been through things together). Feel is about the first and the last."),
             ("h3", "The five-second arrival test"),
             ("p", "Walking into a space should feel like walking into [[a room full of your members|a room full of your brothers or sorors]]. Within five seconds, a member should know:"),
             ("cards", [
                 ("Who's here", "Faces and presence, before anyone posts."),
                 ("What's happening", "What's live, and what's coming up."),
                 ("What's for me", "What changed since I was last here, and anything that involves me."),
                 ("That I can just hang out", "No pressure to post, join a call or reply."),
             ]),
             ("seealso", "Connected element", "Getting members to \"what's for me\" without hunting is the job of {{06}}. Feel is how that arrival feels; Flow is how it works."),
             ("h3", "It has to fit before it can feel right"),
             ("p", "A space can't feel like home if it doesn't fit. Give members every feature on every screen and they're overwhelmed. Leave out what they need and they're underwhelmed, and drift back to the apps they already know. When the tools match the group, its stage and the moment, the space feels made for you: tailored, not off the rack."),
             ("seealso", "Connected element", "How a space adapts to its members is covered in {{05}}."),
             ("h3", "Digital communing"),
             ("p", "To *commune* is to share closely with others. A meeting is attending; communing is connecting. Healthy spaces give members several ways to commune, and follow one rule: **the more private the act, the less it shows.**"),
             ("table", ["Way to commune", "Who", "Feels like", "Others can see"], [
                 ["**Pass a note**", "2 people, in chat", "Passing a note in class", "Nothing"],
                 ["**Whisper**", "2 people, by voice", "Leaning over to someone", "Nothing"],
                 ["**Mingle**", "2 to 5, members choose", "Chatting before things start", "That a group exists, and who's in it"],
                 ["**Huddle rounds**", "2 to 5, host assigns", "Tables at a banquet", "Groups and who's in them"],
                 ["**Breakout**", "Any size", "Stepping into another room", "Rooms and counts"],
             ]),
             ("h3", "A meeting as a sequence of moments"),
             ("p", "The best in-person meetings aren't one long agenda. They have a shape. Online meetings can have the same one:"),
             ("moments", [
                 ("Before", "Mingle", "Members form small groups on their own. Nobody is pulled in automatically; members accept or decline an invite."),
                 ("Start", "[[Call to order|Gavel]]", "The host ends side conversations and brings everyone into the main room."),
                 ("During", "Huddle rounds", "The host sets group size, a prompt and a timer. Rounds can shuffle so members meet someone new."),
                 ("After", "Report back", "One group at a time gets the mic to share with the whole room."),
             ]),
             ("callout", "**Fade the room, don't cut it.** Inside a huddle, members hear their group clearly and the main room as a quiet murmur, like a table in a busy hall. The host's voice always cuts through (\"two minutes left\"). Anyone can sit out a round with one tap."),
             ("h3", "Cues that show a space is alive"),
             ("cues", [
                 (ICON_DOT, "Presence", "Available, busy or away, shown with a shape and a label, never color alone."),
                 (ICON_BARS, "Who's talking", "A ring around a speaker, and a glow around a group when anyone in it is talking."),
                 (ICON_EYE, "A look through the door", "See who's in a meeting, and which groups are talking, before you join."),
                 (ICON_BELL, "Invitations, not summons", "Digests by default; members choose who and what can reach them right away."),
             ]),
             ("seealso", "Connected element", "Who and what reaches a member, and when, is part of how communications move in {{06}}."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "Communing is built into the space, not bolted on.",
         "blocks": [
             ("p", "Each feature maps to a job the room used to do."),
             ("features", [
                 ("Whisper", "A private voice aside during a meetup, without leaving the meeting."),
                 ("Peek", "See who's in a meetup, and what's happening, before you join."),
                 ("Breakout rooms", "Separate rooms for larger groups during a meetup."),
                 ("Pass a note", "A private note to one person, inline in the chat, that turns into a direct message with one tap."),
                 ("Mingle and huddle rounds", "Small groups inside the meeting, member-chosen or host-assigned, with prompts, timers and shuffles."),
                 ("Presence and talking cues", "Available, busy or away, plus who's talking now, everywhere in the space."),
                 ("Arrival recap", "\"Since you were last here\": what changed with your people, in five seconds."),
                 ("Signal Mixer", "Mute, pause, digest or elevate any space, person or topic, right from a message."),
             ]),
             ("callout", "**Safety is part of feel.** Notes, whispers and huddles can be reported to moderators. Huddles are never recorded unless everyone agrees. In spaces with members under 18, private one-on-one features between adults and minors are turned off. The rules behind this live in {{02}}."),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "When a member opens your group chat, can they tell who's around without anyone posting?",
                 "When did a member last have a real one-on-one conversation at one of your virtual meetings?",
                 "How many members only show up for the one big event of the year?",
                 "Can a member say something privately in the moment, without leaving the conversation?",
                 "How many members have muted your main chat? If you don't know, that's an answer too.",
                 "Is there a ritual members can count on, weekly, monthly or each season?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Monthly gathering rate.",
         "blocks": [
             ("signal", "1×", "The share of members who take part in at least one gathering a month,",
              "online or in person: a meetup, a huddle, a service day, a watch party. Track it monthly. If it rises while your big-event attendance holds, members are connecting between events, not just at them."),
             ("p", "It measures what McMillan and Chavis call shared emotional connection: the things members have been through together. Tracking it month over month, and acting on what it shows, is the job of {{08}}."),
         ]},
    ],
    "connected": [
        ("05", "The right tools for the group and the moment, no more and no less. Without fit, members feel overwhelmed or underwhelmed."),
        ("06", "Members arrive at what matters in seconds, and communications reach them as invitations rather than summons."),
        ("02", "Clear rules and fair moderation make members feel safe enough to relax, talk and stay."),
    ],
    "sources": [
        "Bailenson, J. N. (2021). Nonverbal overload: A theoretical argument for the causes of Zoom fatigue. *Technology, Mind, and Behavior, 2*(1).",
        MCMILLAN,
        "Oldenburg, R. (1989). *The Great Good Place.* Paragon House.",
    ],
}

# ---------------------------------------------------------------- 08 INTELLIGENCE
CHAPTERS["08"] = {
    "hero": "A home that notices, and gets better every season.",
    "sections": [
        {"id": "breaks", "label": "01 · What breaks without it",
         "title": "Most groups notice a member drifting only after they've left.",
         "blocks": [
             ("p", "Engagement rarely collapses overnight. It fades: a member skips a meeting, then a month of messages, then dues. By the time anyone notices, the relationship has gone cold."),
             ("p", "Meanwhile the group's knowledge (how the [[gala|banquet]] was run, which sponsor said yes, who mentored whom) lives in the heads of [[leaders|officers]] who will hand off next year. Every new [[leadership team|exec board]] starts over."),
             ("table", ["Without intelligence", "With it"], [
                 ["Drift discovered at renewal time", "Drift spotted while there's still time to act"],
                 ["Every new [[leader|officer]] starts from zero", "Knowledge stays with the group"],
                 ["Decisions made on gut feeling", "Decisions checked against what worked before"],
                 ["Reports built by hand at year end", "Scoreboards that keep themselves current"],
             ]),
         ]},
        {"id": "good", "label": "02 · What good looks like",
         "title": "Two sides of the roof: knowledge and insights.",
         "blocks": [
             ("p", "Intelligence has two halves, like the two pitched sides of the roof:"),
             ("cards", [
                 ("Knowledge", "What the group knows: its history, documents, decisions and how things are done. Searchable, and drawn from your group's own records."),
                 ("Insights", "What the group is learning: who's engaged, who's drifting, which events work and what to try next."),
             ]),
             ("h3", "Vital signs"),
             ("p", "Every element in this guide ends with one signal to watch. Together they're your [[organization's|group's]] vital signs: a short scoreboard of how the whole house is doing. Some of these signals, plus two simple measures, map to the elements of community that McMillan and Chavis proposed:"),
             ("table", ["Element of community", "Signal to watch"], [
                 ["**Membership:** I belong here", "Profile completion and return visits"],
                 ["**Influence:** I matter here", "Share of members who contributed or voted"],
                 ["**Fulfillment of needs:** I get something here", "A simple \"got value this month?\" pulse"],
                 ["**Shared emotional connection:** we've been through things together", "Monthly gathering rate"],
             ]),
             ("h3", "Suggestions, never surprises"),
             ("callout", "**Intelligence advises; people decide.** An assistant can notice that members of [[a program|a line]] haven't RSVP'd and draft a three-step plan to bring them in, but nothing sends until a person reviews it and applies it. The assistant is designed to show only what the person asking could already see."),
             ("seealso", "Connected elements", "Intelligence can only learn from data members trust you with ({{03}}), and what it learns adjusts {{05}} over time."),
         ]},
        {"id": "delivers", "label": "03 · How [[BigTopa|GreekHouse]] delivers it",
         "title": "Insights, and an assistant that knows your group.",
         "blocks": [
             ("features", [
                 ("Insights dashboard", "Engagement, marketing and monetization in one view, for the whole hub."),
                 ("Lifecycle Agent", "Spots members who are drifting and drafts a plan to bring them back. Nothing sends without approval."),
                 ("Group knowledge", "Answers grounded in your own documents and history, respecting who can see what."),
                 ("Meeting summaries", "Notes and action items from meetups, saved where the group can find them."),
                 ("Vital signs", "The eight signals from this guide in one scoreboard: the ones the platform can measure tracked automatically, the rest entered by hand."),
             ]),
         ]},
        {"id": "ask", "label": "04 · Ask yourself",
         "title": "Questions for your [[leadership team|exec board]].",
         "blocks": [
             ("ask", [
                 "How would you know a member is drifting before they stop paying dues?",
                 "Where does your group's knowledge live when [[a leader|an officer]] hands off?",
                 "Which of your events worked best last year, and how do you know?",
                 "Who reviews your numbers, and how often?",
                 "What should an assistant never do without asking first?",
             ]),
         ]},
        {"id": "signal", "label": "05 · One signal to watch",
         "title": "Members brought back.",
         "blocks": [
             ("signal", "↺", "The share of members flagged as drifting who come back within 30 days,",
              "through a message, a meetup, an RSVP or a renewal. It measures whether insight is turning into action."),
         ]},
    ],
    "connected": [
        ("03", "You can only learn from what members trust you with. Data earns the trust; Intelligence turns it into insight."),
        ("05", "What the space learns adjusts the fit over time, so the tools keep fitting as the community grows."),
        ("01", "Scoreboards show whether the outcomes you named are actually moving."),
    ],
    "sources": [MCMILLAN],
}
