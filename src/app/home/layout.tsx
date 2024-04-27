"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect } from "react";
import NavBar from "../components/navbar";
import { config } from "./page";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const navBarDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = navBarDisclosure;
  const navbarWidth = "15em";
  const isMobileNavBarVisible = isOpen && !isLargerThan800;

  return (
    <>
      {/* <WorkInProgressWarningBar /> */}
      <Box w="100%" margin={0} padding={0} overflowX="hidden">
        {isOpen ? (
          <NavBar
            backgroundColor="white"
            disclosure={navBarDisclosure}
            isMobile={!isLargerThan800}
            position="fixed"
            width={navbarWidth}
            display="inline-block"
            verticalAlign="top"
          >
            <HStack justifyContent="flex-end">
              <IconButton
                size="sm"
                alignSelf="flex-end"
                variant="ghost"
                margin="0.5rem"
                aria-label="Expand navigation menu"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </HStack>
            <VStack padding="2em">
              <Link href={`#${config.home.name}`}>
                <VStack gap={0}>
                  <Text fontWeight={600}>the wedding of</Text>
                  <Text fontSize="2xl" fontWeight={700}>
                    Dan & Grace
                  </Text>
                </VStack>
              </Link>
              <Divider marginBottom="1em" />
              {config.sections.map((props) => {
                return (
                  <Link key={props.name} href={`#${props.name}`}>
                    {props.name}
                  </Link>
                );
              })}
            </VStack>
          </NavBar>
        ) : (
          <IconButton
            bgColor="white"
            variant="ghost"
            margin="0.5rem"
            size="lg"
            position="fixed"
            aria-label="Expand navigation menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
        )}
        <HStack margin={0} padding={0} justifyContent="flex-end">
          <Box
            width={
              isOpen && isLargerThan800
                ? `calc(100% - ${navbarWidth})`
                : "100vw"
            }
            display={isMobileNavBarVisible ? "none" : "inline-block"}
            verticalAlign="top"
          >
            <main>{children}</main>
          </Box>
        </HStack>
      </Box>
    </>
  );
}
