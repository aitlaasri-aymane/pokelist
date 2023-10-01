import React from "react";
import { Box, Card, useColorMode, Skeleton, ScaleFade } from "@chakra-ui/react";

const CardSkeleton: React.FC<{ keyId: number }> = ({ keyId }) => {
  const { colorMode } = useColorMode();

  return (
    <div
      key={keyId}
      className="basis-[100%] min-[450px]:basis-[30%] flex justify-center"
    >
      <ScaleFade className="max-[450px]:w-full" initialScale={0.9} in={true}>
        <Card
          align="center"
          variant="elevated"
          className="w-full min-[450px]:w-[23rem] h-[12rem] flex flex-row relative duration-300 hover:scale-[1.05]"
        >
          <Box
            data-testid="card-header"
            style={{
              borderRadius: "var(--card-radius) var(--card-radius) 0px 0px",
            }}
            className={`w-full h-[50%] p-5 flex justify-between bg-red-500 ${
              colorMode === "dark" && "saturate-[0.8] brightness-[0.8]"
            }`}
          >
            <div className="flex gap-2">
              <img className="w-6 h-6" src="./pokeball.svg" alt="" />
              <div className="flex gap-2">
                #
                <Skeleton className="!rounded-md max-[450px]:w-12 w-16 h-5 mt-[2px]"></Skeleton>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="!rounded-md w-16 h-5"></Skeleton>
            </div>
          </Box>
          <Skeleton className="!rounded-full z-[12] !absolute top-[20%] w-24 h-24"></Skeleton>
          <Card className="!rounded-full z-[10] !absolute top-[20%] w-24 h-24"></Card>

          <Skeleton className="!mx-4 !mt-auto !mb-4 !rounded-md w-[80%] h-8"></Skeleton>
        </Card>
      </ScaleFade>
    </div>
  );
};

export default CardSkeleton;
