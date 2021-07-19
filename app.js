// ====================================================

function Input(name, type, value) {
  return `
        <div class="form-col">
            <label for="${name}" type="${type}">${name}</label>
            <input id="${name}" type="${type}" value="${value}"> 
        </div>
    `;
}

// ====================================================

function Select(name, options, value) {
  const Option = ({ name, value }, initalValue) => {
    let selected = initalValue == value ? "selected" : "";

    return `<option id="${value}" value="${value}" ${selected}>${name}</option>`;
  };

  let optionsHTML = "";

  options.forEach((o) => {
    optionsHTML += Option(o, value);
  });

  return `
    <div class="form-col">
        <label for="${name}">${name}</label>
        <select id="${name}" >
            <option disabled value="" >Select ${name}</option>
            ${optionsHTML}
        <select>
    </div>
    `;
}

// ====================================================

function Form(title, inputs) {
  let inputsHTML = "";
  inputs.forEach((cols) => {
    let rowHTML = "";
    cols.forEach(({ name, type, value, options }) => {
      rowHTML +=
        type === "select"
          ? Select(name, options, value)
          : Input(name, type, value);
    });
    inputsHTML += `<div class="form-row">${rowHTML}</div>`;
  });

  return `
        <form class="Form">
            <legend>${title}</legend>
            ${inputsHTML}
        </form>
    `;
}

// ====================================================

// const inputs = [
//   [{ name: "First name", type: "text", value: "mario" }],
//   [
//     { name: "Last name", type: "text", value: "monir" },

//     {
//       name: "Gender",
//       type: "select",
//       value: "2",
//       options: [
//         { name: "Male", value: "1" },
//         { name: "Female", value: "2" },
//       ],
//     },
//   ],
//   [
//     { name: "Password", type: "password", value: "" },
//     { name: "Confirm Password", type: "password", value: "" },
//   ],
// ];

// ====================================================

// document.body.innerHTML = Form("Mario Form", inputs);
