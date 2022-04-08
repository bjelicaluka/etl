import { DotsLoader } from "../Loaders/DotsLoader";

export const TableLoader = ({isLoading}) => {
    return <tr><td className="border-0"><DotsLoader isLoading={isLoading} /></td></tr>;
};