import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ClickSpark from "./blocks/Animations/ClickSpark/ClickSpark";

const App = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      <ClickSpark
        sparkColor="#000000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ClickSpark>
    </>
  );
};

export default App;
