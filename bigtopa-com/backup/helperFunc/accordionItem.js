

export default function accordionItem(
  question = '',
  answer = '',
  id='One',
  expanded = false,
  dataIndex=0,
  
) {

  // const dataIndex = arguments.length > 3 ? arguments[3] : -1; // Handle potential extra arguments

  const html = `
    <div class="accordion-item" data-index="${dataIndex}">
      <h2 class="accordion-header" id="heading${id}">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse${id}"
          aria-expanded=${expanded}
          aria-controls="collapse${id}"
        >
          ${question}
        </button>
      </h2>
      <div
        id="collapse${id}"
        class="accordion-collapse collapse ${expanded ? 'show' : ''}"
        aria-labelledby="heading${id}"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          ${answer}
        </div>
      </div>
    </div>
  `;

  return html;
}