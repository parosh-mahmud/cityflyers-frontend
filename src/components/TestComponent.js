import React, { useEffect } from 'react';

const TestComponent = () => {
  useEffect(() => {
    // Assuming your API response is stored in a variable named apiResponse
    const apiResponse = [
      {
        "SearchId": "d7a2bfc5-a6ff-4619-be42-680521600046",
        "Results": [
          {
            "ResultID": "b5bd143f-e7f9-4197-8c00-b3ee734e26d3",
            "IsRefundable": true,
            "Fares": [
              {
                "BaseFare": 1874.0,
                "Tax": 925.0,
                "Currency": "BDT",
                "OtherCharges": 0.0,
                "Discount": 74.0,
                "AgentMarkUp": 0.0,
                "PaxType": "Adult",
                "PassengerCount": 1,
                "ServiceFee": 0.0
              }
            ],
            "Discount": 74.0,
            "Validatingcarrier": "BG",
            // ... other fields
          }
        ],
        "Error": null
      }
    ];

    // Log the validatingcarrier
    const validatingcarrier = apiResponse[0]?.Results[0]?.Validatingcarrier;
    console.log("Validating Carrier:", validatingcarrier);
  }, []);

  return (
    // Your component JSX
    <div>
      {/* Your component content */}
    </div>
  );
};

export default TestComponent;
