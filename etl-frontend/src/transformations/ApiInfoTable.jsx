import { useEffect, useState } from "react";
import { TableSizes } from "../utils/constants";
import { validateText } from "../utils/validations";
import { TextInput } from "../components/Form/TextInput";
import { Table } from "../components/Table/Table";
import { TableBody } from "../components/Table/TableBody";
import { TableHead } from "../components/Table/TableHead";
import { TableRow } from "../components/Table/TableRow";
import { ApiInfo } from "./ApiInfo";

export const ApiInfoTable = () => {

  const allOptions = [];

  useEffect(() => {
  }, [allOptions])

  const [value, setValue] = useState('');
  const [options, setOptions] = useState(allOptions ? [...allOptions] : []);

  useEffect(() => {
    allOptions && (value === '' ? setOptions([...allOptions]) : setOptions([...allOptions.filter(opt => opt.name.toLowerCase().startsWith(value.toLocaleLowerCase()))]));
  }, [value, allOptions])

  const [selectedApiInfo, setSelectedApiInfo] = useState('');

  const InfoComponent = ({info}) => 
    <button
      className="btn btn-darker btn-sm"
      onClick={() => {
        setSelectedApiInfo(info);
      }}
    >
      Info
    </button>

  return (
    selectedApiInfo ? <ApiInfo info={selectedApiInfo} onBackClick={() => setSelectedApiInfo(null)} /> :
    <>
      <TextInput
        label="Search value"
        value={value}
        isValid={validateText(value)}
        onChange={(e) => setValue(e.target.value)}
      />
      <Table
        hasPagination={false}
        size={TableSizes.medium}
      >
        <TableHead
          columns={["Name", "Type", "Info", ""]}
        />
        <TableBody>
          {options?.length ? options.map((option, i) =>
            <TableRow
              key={i}
              cells={[option.name, option.type, option.info.title, <InfoComponent info={option.info} />]}
            />) : <></>}
        </TableBody>
      </Table>
    </>
  );
}