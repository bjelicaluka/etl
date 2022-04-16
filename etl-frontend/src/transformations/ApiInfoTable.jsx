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

  const allOptions = [
    {
      name: "Take One",
      type: "one",
      info: {
        title: "Take One",
        description: "Takes one element from the stream.",
        sections: [
          {
            title: "Take First",
            description: "Takes First element from the stream.",
            codeExample: `take first User select firstName;`
          },
          {
            title: "Take Last",
            description: "Takes Last element from the stream.",
            codeExample: `take last User select firstName;`
          },
        ]
      }
    },
    {
      name: "Take Many",
      type: "many",
      info: {
        title: "Take Many",
        description: "Takes many elements from the stream.",
        sections: [
          {
            title: "Take All",
            description: "Takes all elements from the stream.",
            codeExample: `take all Users select firstName;`
          },
        ]
      }
    },
    {
      name: "Filter One",
      type: "one",
      info: {
        title: "Filter One",
        description: "Filters one elements in the stream.",
        sections: [
          {
            title: "Take First",
            description: "Takes first element in the stream that satisfy condition.",
            codeExample: `take first Users where type == "User" select firstName;
            take first Accounts where type != "User" select accountId;
            take first Users where type == "User" and startswith(firstName, "Lu") or endswith(lastName, "ic") select firstName;
            take first Users where type == "User" and contains(lastName, "ic") select firstName;
            take first Users where exists(firstName) select firstName;`
          },
          {
            title: "Take Last",
            description: "Takes last element in the stream that satisfy condition.",
            codeExample: `take last User where type == "User" select firstName;
            take last Account where type != "User" select accountId;
            take last User where type == "User" and startswith(firstName, "Lu") or endswith(lastName, "ic") select firstName;
            take last User where type == "User" and contains(lastName, "ic") select firstName;
            take last User where exists(firstName) select firstName;`
          },
        ]
      }
    },
    {
      name: "Filter Many",
      type: "many",
      info: {
        title: "Filter Many",
        description: "Filters many elements in the stream.",
        sections: [
          {
            title: "Take All",
            description: "Takes all elements in the stream that satisfy condition.",
            codeExample: `take all Users where type == "User" select firstName;
            take all Accounts where type != "User" select accountId;
            take all Users where type == "User" and startswith(firstName, "Lu") or endswith(lastName, "ic") select firstName;
            take all Users where type == "User" and contains(lastName, "ic") select firstName;
            take all Users where exists(firstName) select firstName;`
          },
        ]
      }
    },
    {
      name: "Transform",
      type: "one/many",
      info: {
        title: "Transform",
        description: "Takes one or many elements from the stream and transforms the output structure.",
        sections: [
          {
            title: "Select",
            description: "Selects which properties to include in the result.",
            codeExample: `take first User select firstName, lastName;`
          },
          {
            title: "Select and Transform",
            description: "Selects which properties to include in the result and transforms it's name.",
            codeExample: `take first User select firstName as name, lastName as surname;`
          },
        ]
      }
    },
  ];

  const [value, setValue] = useState('');
  const [options, setOptions] = useState(allOptions ? [...allOptions] : []);

  useEffect(() => {
    allOptions && (value === '' ? setOptions([...allOptions]) : setOptions([...allOptions.filter(opt => opt.name.toLowerCase().includes(value.toLocaleLowerCase()))]));
  }, [value])

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