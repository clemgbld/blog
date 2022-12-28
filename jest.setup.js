import "@testing-library/jest-dom";
import { useSearchStore } from "./hooks/useSearchStore";

beforeEach(() => {
  const originalState = useSearchStore.getState();
  useSearchStore.setState(originalState);
});

afterEach(() => {
  jest.clearAllMocks();
});
