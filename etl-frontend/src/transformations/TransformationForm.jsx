import { useState } from "react";
import { addTransformation, updateTransformation } from "../services/transformations";
import { validateText } from "../utils/validations";
import { Button } from "../components/Button/Button";
import { Form } from "../components/Form/Form";
import { LintedTextArea } from "../components/Form/LintedTextArea";
import { TextInput } from "../components/Form/TextInput";
import { ApiInfoTable } from "./ApiInfoTable";
import { Tab } from "../components/Tabs/Tab";
import { TabNavItem } from "../components/Tabs/TabNavItem";
import { Tabs } from "../components/Tabs/Tabs";
import { TabsContainer } from "../components/Tabs/TabsContainer";
import { TabsNavContainer } from "../components/Tabs/TabsNavContainer";


export const TransformationForm = ({ isEdit, transformationRule, onSuccess = () => {}, onError = () => {} }) => {
  const [name, setName] = useState(isEdit ? transformationRule.name : '');
  const [rules, setRules] = useState(isEdit ? transformationRule.rules : '');

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [rulesErrorMessage, setRulesErrorMessage] = useState("");

  return (
    <Form onSubmit={() => {
      const action = isEdit ? updateTransformation : addTransformation

      const object = {
        id: transformationRule?.id,
        name,
        rules
      };
      
      !isEdit && delete object['id'];
      action(object).then(onSuccess).catch(onError)
    }}>
      <TextInput
        label="Name"
        value={name}
        isValid={validateText(name)}
        showErrorMessage={showErrorMessage}
        onChange={(e) => setName(e.target.value)}
      />
      <Tabs>
        <TabsNavContainer>
          <TabNavItem iconName="ni ni-bell-55 mr-2">Rules</TabNavItem>
          <TabNavItem iconName="ni ni-bell-55 mr-2">Syntax Info</TabNavItem>
        </TabsNavContainer>
        <TabsContainer>
          <Tab>
            <LintedTextArea
              label="Rules Definition"
              placeholder="sample rules"
              readOnly={false}
              value={rules}
              showErrorMessage={showErrorMessage}
              isValid={!rulesErrorMessage}
              errorMessage={rulesErrorMessage}
              onChange={c => {
                setRules(c);
                try {
                  setRulesErrorMessage(null);
                } catch (error) {
                  setRulesErrorMessage(error.message);
                }
              }}
            />
          </Tab>
          <Tab><ApiInfoTable /></Tab>
        </TabsContainer>
      </Tabs>
      <Button
        name={isEdit ? "Edit" : "Add"}
        type="submit"
        onClick={() => setShowErrorMessage(true)}
      />
    </Form>
  );
}