const columns = ["Name", "Age", "Occupation"];
const data = [
    ["John", 25, "Engineer"],
    ["Jane", 30, "Doctor"],
    ["Doe", 20, "Student"],
    ["Smith", 28, "Designer"]
];
const sortable = true;
const searchable = true;
const filterable = true;

const tableData = {
    columns,
    data,
    sortable,
    searchable,
    filterable,
};

export default tableData;