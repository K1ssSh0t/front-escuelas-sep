import { Button } from "./ui/button";

export const ExportCSV = ({ data }: any) => {
  // Function to convert the array of objects to CSV format
  const convertArrayToCSV = (array: any) => {
    const csvRows = [];

    // Get the headers from the keys of the first object
    const headers = Object.keys(array[0]);
    csvRows.push(headers.join(",")); // Add headers row

    // Loop through the array and convert each object to a CSV row
    for (const row of array) {
      const values = headers.map((header) => {
        const value = row[header];
        return `"${value}"`; // Wrap each value in quotes for CSV format
      });
      csvRows.push(values.join(","));
    }

    // Return the CSV as a single string
    return csvRows.join("\n");
  };

  // Function to trigger CSV download
  const downloadCSV = () => {
    const csvData = convertArrayToCSV(data); // Convert data to CSV format
    const blob = new Blob([csvData], { type: "text/csv" }); // Create a Blob from the CSV data
    const url = window.URL.createObjectURL(blob); // Create a temporary URL for the Blob

    // Create a link and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv"; // Set the filename
    a.click(); // Programmatically click the link to trigger the download

    // Clean up by revoking the object URL
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={downloadCSV}>
      {" "}
      <DownloadIcon className="mr-2 h-4 w-4" />
      Descargar
    </Button>
  );
};

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
