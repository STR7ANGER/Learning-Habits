
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ClickSpark from "./blocks/Animations/ClickSpark/ClickSpark";

const App = (): JSX.Element => {
  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>{" "}
    </ClickSpark>
  );
};

export default App;
