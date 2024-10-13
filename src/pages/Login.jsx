import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";
import { FaSignInAlt, FaUserPlus, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px 0 20px 0;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 2px solid #ddd;
  background: transparent;
  transition: border-color 0.3s;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #764ba2;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.3s;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #4a5568;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    margin-top: 1.5rem;
    font-size: 1rem;
  }
`;

const ToggleLink = styled.span`
  color: #3498db;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        await registerUser(username, email, password);
      }
      navigate("/");
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>{isLogin ? "Welcome Back" : "Create Account"}</Title>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              whileFocus={{ scale: 1.02 }}
              required
            />
          )}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            whileFocus={{ scale: 1.02 }}
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            whileFocus={{ scale: 1.02 }}
            required
          />
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinnerIcon />
            ) : isLogin ? (
              <FaSignInAlt />
            ) : (
              <FaUserPlus />
            )}
            <span>{isLoading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}</span>
          </Button>
        </form>
        <ToggleText>
          {isLogin ? "New to our platform? " : "Already have an account? "}
          <ToggleLink onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </ToggleLink>
        </ToggleText>
      </Card>
    </Container>
  );
}

export default Auth;
