import { useEffect, useState } from "react";

type Props = {
  svgPath: string;
  fillColor: string;
};

const DynamicSvgImage = ({ svgPath, fillColor }: Props) => {
  const [svgUrl, setSvgUrl] = useState("");

  useEffect(() => {
    // Function to load and modify the SVG
    const loadAndModifySVG = async () => {
      try {
        // Fetch the SVG content from the provided path
        const response = await fetch(svgPath);
        let svgText = await response.text();

        // Modify the fill color
        svgText = svgText.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);

        // Convert the modified SVG to a data URL
        const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);

        // Update the state with the generated URL
        setSvgUrl(url);
      } catch (error) {
        console.error("Error loading or modifying SVG:", error);
      }
    };

    loadAndModifySVG();

    // Clean up the object URL when the component unmounts
    return () => {
      if (svgUrl) {
        URL.revokeObjectURL(svgUrl);
      }
    };
  }, [svgPath, fillColor]); // Re-run the effect if svgPath or fillColor changes

  return <img src={svgUrl} alt="Dynamic SVG" />;
};

export default DynamicSvgImage;
