import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  Textarea,
  Image,
  Stack,
  SimpleGrid,
  Text,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const [preferences, setPreferences] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [designDescription, setDesignDescription] = useState("");
  const [designImage, setDesignImage] = useState("");
  const [furnitureSuggestions, setFurnitureSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateDesign = async () => {
    setLoading(true);
    setDesignDescription("");
    setDesignImage("");
    setFurnitureSuggestions([]);

    try {
      const textResponse = await axios.post("/api/generate-text", {
        preferences,
        dimensions,
      });
      const imageResponse = await axios.post("/api/generate-image", {
        preferences,
        dimensions,
      });
      const furnitureResponse = await axios.post("/api/generate-furniture", {
        preferences,
        dimensions,
      });

      setDesignDescription(textResponse.data.description);
      setDesignImage(imageResponse.data.imageUrl);
      setFurnitureSuggestions(furnitureResponse.data.suggestions);
    } catch (error) {
      console.error("Error generating design:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      <Heading mb={6}>Virtual Interior Designer</Heading>
      <Stack spacing={4}>
        <Input
          placeholder="Enter your design preferences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <Input
          placeholder="Enter your room dimensions"
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
        />
        <Button
          colorScheme="teal"
          onClick={handleGenerateDesign}
          isLoading={loading}
        >
          Generate Design
        </Button>
        {loading && <Spinner />}
        {designDescription && <Textarea value={designDescription} readOnly />}
        {designImage && <Image src={designImage} alt="Design Image" />}
        {furnitureSuggestions.length > 0 && (
          <Box mt={6}>
            <Heading size="md" mb={4}>
              Suggested Furniture and Decor
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {furnitureSuggestions.map((item, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Image src={item.imageUrl} alt={item.name} />
                  <Text mt={2}>{item.name}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
