import { Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import SearchForm from './SearchForm';

const Oneway = () => {
  const [journeyType, setJourneyType] = useState(1); // Initialize with 1 for One Way

  const handleJourneyTypeChange = (value) => {
    const selectedJourneyType = parseInt(value, 10); // Parse value as an integer
    setJourneyType(selectedJourneyType);
    
  };

  return (
    <div>
      {/* One way, Return, Multicity */}
      <Flex align="center" mb={4}>
        <RadioGroup defaultValue="1" onChange={handleJourneyTypeChange}>
          <Radio value="1" size="lg" colorScheme="teal">
            <Text fontSize="lg">One Way</Text>
          </Radio>
          <Radio value="2" size="lg" colorScheme="teal">
            <Text fontSize="lg">Return</Text>
          </Radio>
          <Radio value="3" size="lg" colorScheme="teal">
            <Text fontSize="lg">Multicity</Text>
          </Radio>
        </RadioGroup>
      </Flex>

      {/* Pass journeyType as a prop to SearchForm */}
      
    </div>
  );
};

export default Oneway;
