
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    console.log(data)

    let selector = d3.select("#selDataset");

    let Names = data.names;

    for (let i = 0; i < Names.length; i++) {
        selector
            .append("option")
            .text(Names[i])
            .property("value", Names[i]);
    };

    // Names.forEach((id) => {
    //     selector
    //       .append("option")
    //       .text(id)
    //       .property("value", id);
    //   });
  
    buildmetadata(Names[0])
    buildcharts(Names[0])
});


function buildmetadata(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        console.log("data")
        console.log(data)

        let panel = d3.select("#sample-metadata");

        let Metadata = data.metadata;

        let resultArray = Metadata.filter(sampleObj => sampleObj.id == id);

        console.log("resultArray")
        console.log(resultArray)

        let result = resultArray[0];

        panel.html("");

        for (key in result) {
            panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };

        // Object.entries(result).forEach(([key, value]) => {
        //     panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        //   });
      

    })
};

function optionChanged(id) {

    buildmetadata(id)
    buildcharts(id)

};

function buildcharts(id) {

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        console.log("data")
        console.log(data)

        let Samples = data.samples;

        let resultArray = Samples.filter(sampleObj => sampleObj.id == id);

        console.log("resultArray")
        console.log(resultArray)

        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);


        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
          };
          
          let bubbleData = [
            {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
              }
            }
          ];
      
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      

    })
};

