// ----------------------------------------------------------------

let rows = document.getElementById("generate-form-rows");
let submit = document.getElementById("generate-form-submit");
let formOutput = document.getElementById("form-output");
let inputsArea = document.getElementById("inputs-area");
let inputs = [
  [{ name: "First Name", type: "text", value: "initial value" },
      {name:"Last Name", type:"text",value:"lastname intial value"}],
  [
    {
      name: "Gender",
      type: "select",
      value: "2",
      options: [
        {
          name: "Male",
          value: "1",
        },
        {
          name: "Female",
          value: "2",
        },
        {
          name: "Others",
          value: "3",
        },
      ],
    },
  ],
  [{name:"password", type:"password", value:"password"}],
  [{name:"number", type:"number", value:"213"}],
   
];
let formTitle = "Form Title";
let tabs = document.getElementById("tabs");
let code = document.getElementById("code");
let module = document.getElementById("module");

// ----------------------------------------------------------------

function changeTab(e, name) {
  if (name === "module") {
    document.getElementById("play").style.display = "none";
    document.getElementById("code").style.display = "none";
    document.getElementById("module").style.display = "block";
  } else if (name === "code") {
    console.log("hello")
    document.getElementById("play").style.display = "none";
    document.getElementById("module").style.display = "none";
    document.getElementById("code").style.display = "block";
  } else {
    document.getElementById("code").style.display = "none";
    document.getElementById("module").style.display = "none";
    document.getElementById("play").style.display = "block";
  }
}

const delimter = "\n \n";
const pageDelimeter = "\n //" + "=".repeat(60) + "\n";

module.innerText = `
  // GenerateForm.js
 
 /**
    * this module for generating forms can be used in any  javascript ui
    *
    * /

  ${Input.toString()}
  ${delimter}
  ${Select.toString()}
  ${delimter}
  ${Form.toString()}
  ${delimter}
  module.export = Form;
  ${pageDelimeter}


  // GenerateForm.css

  .Form {
    padding: 10px 20px;
    border: 2px solid #d1d1d1;
    border-radius: 15px;
  }
  
  .Form legend {
    text-align: center;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .form-col {
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 5px;
    flex: 1;
    min-width: 200px;
  }
  
  .form-col input {
    height: 25px;
    background: transparent;
    border: 2px solid #d1d1d1;
    border-radius: 5px;
  }
  .form-col select {
    height: 31px;
    background: transparent;
    border: 2px solid #d1d1d1;
    border-radius: 5px;
  }
  ${pageDelimeter}
`;

tabs.innerHTML = `
  <button onclick="changeTab(event,'play')">Form Generator Play Ground</button>
  <button onclick="changeTab(event,'code')">Form Generator HTML Code</button>
  <button onclick="changeTab(event,'module')">Form Generator Play code module</button>
`;
// ----------------------------------------------------------------

function Input(name, type, value) {
  return `
        <div class="form-col">
            <label for="${name}" type="${type}">${name}</label>
            <input id="${name}" type="${type}" value="${value}" required> 
        </div>
    `;
}

// ----------------------------------------------------------------

function Select(name, options, value) {
  const Option = ({ name, value }, initalValue) => {
    let selected = initalValue == value ? "selected" : "";

    return `<option id="${value}" value="${value}" ${selected}>${name}</option>`;
  };

  let optionsHTML = "";

  options &&
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

// ----------------------------------------------------------------

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
            <div class="form-row"><button id="submit-form" type="submit" >Submit</button></div>
        </form>
    `;
}

// =======================================================================

function titleChange(e) {
  formTitle = e.target.value;
  Render();
}

function textAreaChange(e) {
  inputs = JSON.parse(e.target.value);
  Render();
}

function onChange(e) {
  let [name, row, col] = e.target.id.split("-");
  inputs[row][col][name] = e.target.value;
  Render();
}
// ----------------------------------------------------------------
function InputHTML(name, value, row, col) {
  return `
        <input 
            value="${value}" 
            class="ig" 
            id="${name}-${row}-${col}" 
            placeholder="${name}"
            onchange="onChange(event)"
        />
    `;
}
// ----------------------------------------------------------------
function InputsHTML({ name, type, value }, row, col) {
  return `
    <span class="ig-col">
        ${InputHTML("name", name, row, col)}
        ${InputHTML("type", type, row, col)}
        ${InputHTML("value", value, row, col)}
        <button onclick="removeCol(${row},${col})">- Col</button>
    </span>
`;
}
// ----------------------------------------------------------------
function submitRender() {
  inputsArea.innerHTML = `
  <input id="form-title" type="text" placeholder="Form Title" 
         value="${formTitle}" onchange="titleChange(event)" />
  <br/><br/>inputs = <br/><br/>
  <textarea onchange="textAreaChange(event)" class="textarea">${JSON.stringify(
    inputs,
    null,
    2
  )}</textarea>`;

  submit.innerHTML = `
    <button onclick="addRow()">+ Row</button><br/><br/>
`;
}
// ----------------------------------------------------------------
function formRender() {
  let rowHTML = "";
  inputs.forEach((cols, row) => {
    cols.forEach((input, col) => {
      rowHTML += InputsHTML(input, row, col);
    });
    rowHTML += `
          <button onclick="addCol(${row})">+ Col</button>
          <button onclick="removeRow(${row})">- Row</button>
          <br/>`;
  });
  rows.innerHTML = rowHTML;
}
// ----------------------------------------------------------------
function Render() {
  formRender();
  submitRender();
  let formTitle = document.getElementById("form-title").value;
  formOutput.innerHTML = Form(formTitle, inputs);
  code.innerText = document.getElementsByClassName("Form")[0].parentNode.innerHTML;
}
// ----------------------------------------------------------------
function addRow() {
  inputs.push([{ name: "input name", type: "text", value: "" }]);
  Render();
}
// ----------------------------------------------------------------
function removeRow(row) {
  inputs.splice(row, 1);
  Render();
}
// ----------------------------------------------------------------
function addCol(row) {
  inputs[row].push({ name: "inputName", type: "text", value: "" });
  Render();
}
// ----------------------------------------------------------------
function removeCol(row, col) {
  inputs[row].splice(col, 1);
  Render();
}
// ----------------------------------------------------------------
Render();
