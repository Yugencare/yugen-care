import React from "react";

function QuickFacts({ quickFacts }) {
  const isEmpty =
    (quickFacts.quick_facts === "" && quickFacts.facts?.length === 1) ||
    Object.values(quickFacts).length === 0;

  console.log(isEmpty);

  const htmlDecode = (content) => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };
  return isEmpty ? null : (
    <div
      className="QuickFacts text-center content-block1 position-relative"
      style={{
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-md-8 col-sm-10">
            <h2>{quickFacts.quick_facts}</h2>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          {quickFacts.facts?.map((fact, idx) =>
            fact.heading_text !== "" || fact.description_text !== "" ? (
              <div
                key={fact.heading_text + idx}
                className="col-xl-3 col-md-6 col-sm-12 mb-4 mb-md-0"
              >
                <span>{fact.heading_text}</span>
                <p
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: htmlDecode(fact.description_text),
                  }}
                ></p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default QuickFacts;
