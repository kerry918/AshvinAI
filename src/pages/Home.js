import './Home.css';
import ResultDT from "../store/classification_results_dt.json"
import ResultKN from "../store/classification_results_kn.json";
import ResultRF from "../store/classification_results_rf.json";
import ResultSVC from "../store/classification_results_svc.json";

function Home() {
  const results = [
    {
      "model" : "Decision Tree Classifier", 
      "result": ResultDT
    }, 
    {
      "model" : "k-Nearest Neighbors", 
      "result": ResultKN
    }, 
    {
      "model" : "Random Forest ", 
      "result": ResultRF
    }, 
    {
      "model" : "Support Vector Machine", 
      "result": ResultSVC
    }
  ]

  const limitations = [
    "Extracting text from scanned documents may introduce errors, and PDF reader are sometimes incapable of parsing text based images.",
    "Some PDFs use non-standard text encoding, causing pymupdf to fail or extract ambiguous text.",
    "When OCR incorporated with converted pdf (to image), the initial data processing time is increased significantly. However, the classification results improved greatly.", 
    "KNN is good with datasets that have low bias and high variance. Use smaller k value for high variance data.", 
    "Each document type has clear distinguishing keywords, so a Decision Tree can create simple rules to classify them perfectly. Since the dataset is small, a Decision Tree can memorize the training set, making it perfect on that data but might fail on unseen data."
  ]

  return (
    <div className="app">
      <div className="inner-container">
        <div className="app-header-container">
          <h1 className="app-header">Ashvin AI Document Classifier</h1>
          <div className="app-header-right">
            <a href="/" className="nav-link">Classification Results</a>
            <a href="/documents" className="nav-link">Documents</a>
          </div>
        </div>
        
        <div className="result-container">
          {results.map((result, index) => {
            return (
              <div className="result-item" key={index}>
                <p>{result.model}</p>
                <p>Classification Accuracy: {result.result.accuracy}</p>
                <div className="result-table-wrapper">
                  <table className="result-table-container">
                    <thead>
                      <tr className="table-header">
                        <th style={{width: "60%"}}>Original Filename</th>
                        <th style={{width: "40%"}}>Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.result.results.map((item, index) => (
                        <tr key={index} className={item.filename.includes(item.classification) ? "table-row-correct" : "table-row-wrong"}>
                          <td style={{width: "60%"}}>{item.filename}</td>
                          <td style={{width: "40%"}}>{item.classification}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>

        <div className="limitation-section">
          <h3>Limitations</h3>
          {limitations.map((item) => {
            return (
              <li>{item}</li>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
