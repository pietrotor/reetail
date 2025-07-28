import { useState } from "react";

// import Error from "../Error";
// import Table from "../Table";

import { Button } from "@/components/ui";
import {
  Data,
  ErrorDataItem,
  DataItem,
  Categories,
} from "@/utils/dataUtilities";

interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}

export const Endpoint = (props: Props) => {
  const [showTable, setShowTable] = useState(false);
  const [_, setTransformedData] = useState<Data>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/${props.endpoint}`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      setError(data.error);
      setIsLoading(false);
      return;
    }
    setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
    if (data.pdf != null) {
      setPdf(data.pdf);
    }
    setShowTable(true);
    setIsLoading(false);
  };

  // const getPdfName = () => {
  //   switch (props.name) {
  //     case "Assets":
  //       return "Asset Report.pdf";
  //     case "CRA Base Report":
  //       return "Plaid Check Report.pdf";
  //     case "CRA Income Insights":
  //       return "Plaid Check Report with Insights.pdf";
  //     default:
  //       return "Statement.pdf";
  //   }
  // };

  return (
    <>
      <div>
        <h1>Post</h1>
        <div>
          <div>
            {props.name != null && <span>{props.name}</span>}
            <span>{props.schema}</span>
          </div>
          <div>{props.description}</div>
        </div>
        <div>
          <Button onClick={getData}>
            {isLoading ? "Loading..." : `Send request`}
          </Button>
          {pdf != null && (
            <Button

            //   href={`data:application/pdf;base64,${pdf}`}
            //   componentProps={{ download: getPdfName()}}
            >
              Download PDF
            </Button>
          )}
        </div>
      </div>
      {showTable && (
        // <Table
        //   categories={props.categories}
        //   data={transformedData}
        //   isIdentity={props.endpoint === "identity"}
        // />
        <>table</>
      )}
      {error != null && <>error</>}
    </>
  );
};
