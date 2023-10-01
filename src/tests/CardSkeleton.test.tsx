import { render, screen } from "@testing-library/react";
import { DarkMode, LightMode } from "@chakra-ui/react";
import CardSkeleton from "../components/CardSkeleton";

describe("CardSkeleton", () => {
  it("should render the card in dark mode", () => {
    render(
      <DarkMode>
        <CardSkeleton keyId={1} />
      </DarkMode>
    );
    expect(screen.getByTestId("card-header")).toHaveClass("saturate-[0.8]");
  });

  it("should render the card in light mode", () => {
    render(
      <LightMode>
        <CardSkeleton keyId={1} />
      </LightMode>
    );

    expect(screen.getByTestId("card-header")).not.toHaveClass("saturate-[0.8]");
  });
});
