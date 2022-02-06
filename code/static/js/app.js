//made a call to the json file. had issues with retrieving the data and had to open the index.html file with Live Server. tried first with promise and async to make sure data loaded
// const file = "samples.json";

// const dataPromise = d3.json(file);

// console.log("Data Promise:", dataPromise);


// const jsonFile = async () => {
//     const data = await d3.json(file)
//     console.log("Data", data);
// }

// jsonFile()
// decided to retrieve using the shorthand way. making sure this works
d3.json("samples.json").then(data => console.log(data))


// now to populate dropdown with the samples data
function init() {
    let dropDownMenu = d3.select("#selDataset"); 
//using => to call json file
    d3.json("samples.json").then(data => {
        let sampleID = data.names;
        sampleID.forEach(sample => {dropDownMenu.append("option").text(sample).property("value", sample)
     });
 // Assign the value of the dropdown menu option to a variable
     let namesID = dropDownMenu.property("value");
     console.log(namesID);
     barChart(namesID);
     bubbleChart(namesID);
     metaData(namesID);
    });
};


// //create bar chart from ID's
function barChart (sampleotu){
    d3.json('samples.json').then((data)=>{
        let otusamplesID = data.samples;
        let otuArray = otusamplesID.filter(object => object.id == sampleotu);
        let otuResult = otuArray[0];
        // console.log(otuResult); to check
//rename variables
        let otu_ids = otuResult.otu_ids;
        let otu_labels = otuResult.otu_labels;
        let sample_values = otuResult.sample_values;

        
// trace was created as well as slicing and reversing for the bar chart
            let trace1 = {
             x: sample_values.slice(0,11).reverse(),
             y: otu_ids.slice(0,11).reverse().map(row => "OTU" + row),
            text: otu_labels.slice(0,11).reverse(),
            type: "bar",
            orientation: "h"
                 };
                 //array was created in order to plot bar chart
                 let data1 = [trace1];
                 let layout = {
                     title: "The Top 10 Operational Taxonomic Units",
                    height: 600,
                     width: 900,    
                 };
                 Plotly.newPlot("bar", data1, layout);
         });
     };

//create bubble graph 
function bubbleChart (sampleotu){
    d3.json('samples.json').then((data)=>{
        let otusamplesID = data.samples;
        let otuArray = otusamplesID.filter(object => object.id == sampleotu);
        let otuResult = otuArray[0];
        // console.log(otuResult); to check
//rename variables
        let otu_ids = otuResult.otu_ids;
        let otu_labels = otuResult.otu_labels;
        let sample_values = otuResult.sample_values;
        
// trace and bubble chart was created
            let trace2 = {
             x: otu_ids,
             y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
            }
                 };
                 //array was created in order to plot bar chart
                 let data2 = [trace2];
                 console.log(otu_ids);
                 let layout2 = {
                     title: "All Operational Taxonomic Units",
                     xaxis: {title: "OTU ID"},
                     height: 600,
                     width: 1500,    
                 };
                 Plotly.newPlot("bubble", data2, layout2);
         });
     };

//display sample metadata an individuas demographic information
function metaData (sampleotu){
    d3.json("samples.json").then(data =>{
        let metaDataDemographics = data.metadata;
        let otuArray = metaDataDemographics.filter(object => object.id == sampleotu);
        let otuResult = otuArray[0];
        let metademo = d3.select("#sample-metadata");
        metademo.html("");
        Object.entries(otuResult).forEach(([key, value]) => {
            metademo.append("h5").text(`${key}: ${value}`)
        });
        console.log(otuResult);
    })

};

// display the data
function optionChanged(namesID) {
    console.log(namesID);
    barChart(namesID);
    bubbleChart(namesID);
    metaData(namesID);
};
init();