import { calculateAreaSize, calculateCodeLines } from "../utils/calculations";
import { LintedTextArea } from "../components/Form/LintedTextArea";

const ApiInfoCard = ({ info }) => (
  <div className="card bg-dark">
    <div className="card-header bg-dark">
      <h3 className="text-white">{info.title}</h3>
      <h4 className="text-white">{info.description}</h4>
    </div>
    <div className="card-body p-0">
      <div className="list-group list-group-flush">
        {info.sections.map((section, i) => {
          return <ApiInfoSection key={i} section={section} />;
        })}
      </div>
    </div>
  </div>
);

const ApiInfoSection = ({ section }) => {
  const numOfLines = calculateCodeLines(section.codeExample);
  const areaSize = calculateAreaSize(numOfLines);

  return (
    <div className="list-gorup-item flex-column align-items-start py-4 px-4">
      <div className="d-flex w-100 justify-content-between">
        <div className="d-flex w-100 align-items-center">
          <h4 className="mb-1 text-white">{section.title}</h4>
        </div>
      </div>
      <h5 className="mt-3 mb-1 text-white">{section.description}</h5> <br />
      <LintedTextArea
        placeholder="sample code"
        readOnly={true}
        value={section.codeExample.replaceAll('            ', '')}
        height={`${areaSize}px`}
        onChange={() => {}}
      />
    </div>
  );
};

export const ApiInfo = ({ info, onBackClick }) => {
  return (
    <>
      <button onClick={onBackClick} className="btn btn-darker btn-sm mb-3">
        Back
      </button>
      <br />
      <ApiInfoCard info={info} />
    </>
  );
};
