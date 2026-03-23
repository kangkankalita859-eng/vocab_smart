// Simple test component
export default function ReadGeometry({ config, onUpdateConfig, onGoHome }) {
  return (
    <div style={{ padding: "20px", backgroundColor: "lightblue" }}>
      <h1>ReadGeometry Component Working!</h1>
      <p>This is a test to see if the component loads.</p>
      <button onClick={() => alert("Button clicked!")}>
        Click Me
      </button>
    </div>
  );
}
