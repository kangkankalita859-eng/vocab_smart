import { useEffect, useState } from "react";
import { constitutionDiagrams, constitutionTopics } from "../data/constitutionTopics";

function ContentBlock({ block }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return <Tag className="study-content-heading">{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="study-content-paragraph">{block.text}</p>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="study-content-list">
          {block.items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}
        </List>
      );
    }
    case "table":
      return (
        <div className="study-table-wrap">
          <table className="study-table">
            <thead><tr>{block.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "diagram": {
      const diagram = constitutionDiagrams[block.id];
      return diagram ? (
        <figure className="study-diagram">
          <img src={diagram.src} alt={block.alt || diagram.alt} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      ) : <p className="study-content-warning">Diagram “{block.id}” was not found.</p>;
    }
    case "callout":
      return <aside className="study-callout"><strong>{block.title}</strong><p>{block.text}</p></aside>;
    default:
      return null;
  }
}

export default function StudyContent({ topicId, onBack }) {
  const topic = constitutionTopics.find((item) => item.id === topicId);
  const [document, setDocument] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!topic) return;
    const controller = new AbortController();
    setDocument(null);
    setLoadError(false);
    fetch(`/data/general-studies/constitution/topics/${topic.id}.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load topic ${topic.id}`);
        return response.json();
      })
      .then(setDocument)
      .catch((error) => {
        if (error.name !== "AbortError") setLoadError(true);
      });
    return () => controller.abort();
  }, [topic]);

  if (!topic) return <section className="study-content-page"><p>Topic not found.</p></section>;

  return (
    <section className="study-content-page">
      <button className="study-back-button" onClick={onBack}>← All Constitution topics</button>
      <p className="study-breadcrumb">General Studies <span>›</span> Constitution of India</p>
      <h1>{document?.title || topic.title}</h1>
      {loadError ? <p>Could not load this topic. Please try again.</p> : !document ? <p>Loading topic…</p> : (
        <div className="study-content-body">
          {document.blocks.map((block, index) => <ContentBlock key={`${block.type}-${index}`} block={block} />)}
        </div>
      )}
    </section>
  );
}
