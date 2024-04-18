<template>
    <div class="my-opentok">
      <p>Great work! You now have 2 clients publishing and subscribing.</p>
      <strong>Click back to the previous Hello World tab in your browser to continue.</strong>
    </div>
  </template>
  
  <script>
  
  export default {
    mounted() {
      const apiKey = '77639e0f-94b9-42f7-9e9e-d4c26d286ebe';
      const sessionId = '1_MX43NzYzOWUwZi05NGI5LTQyZjctOWU5ZS1kNGMyNmQyODZlYmV-fjE3MDIzMDM1Njk1MjN-THpRM3hydHdrU3pFWW54RkxSblcvTS8rfn5-';
      const token = 'eyJhbGciOiJSUzI1NiJ9.eyJhcHBsaWNhdGlvbl9pZCI6Ijc3NjM5ZTBmLTk0YjktNDJmNy05ZTllLWQ0YzI2ZDI4NmViZSIsImlhdCI6MTcwMjMwMzU2OSwianRpIjoiNzc2MzllMGYtOTRiOS00MmY3LTllOWUtZDRjMjZkMjg2ZWJlIiwic2NvcGUiOiJzZXNzaW9uLmNvbm5lY3QiLCJzZXNzaW9uX2lkIjoiMV9NWDQzTnpZek9XVXdaaTA1TkdJNUxUUXlaamN0T1dVNVpTMWtOR015Tm1ReU9EWmxZbVYtZmpFM01ESXpNRE0xTmprMU1qTi1USHBSTTNoeWRIZHJVM3BGV1c1NFJreFNibGN2VFM4cmZuNS0iLCJyb2xlIjoicHVibGlzaGVyIiwiaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdCI6IiJ9.gm6E9pdwuv_4cum-PrcXwo5uKgXntolQoVOGXmPTtTcXr6k2VaiijIRT4q0KP3DuBgfSKsTldv0iFS5lzPId2S-2HwHwf8pnnbc7I2WD5LoTh6TVkPeb8cQ2dV1qa3fpIeC1aQlys7oG6WJlPcUOiTsDogMFL5NBlBgsJ6YzJw9IIoHXJqpUQQ3xgsTo7QSA4idz1yZJZQnWwCPWkUM38wN1V2K9pe7I9peBZG19MRb-tdjSuNuDYvgqHDGHWXL6J5yj9Uu4tSkqcsTLJKrb1G9CNK5UecodovHDvRr6uWB3ihoUo9LtzqJLjzTpZbzQGqasj4Vht0i8A1lV5elsKQ'; // Replace with your actual token
  
      // Connect to session
      const session = OT.initSession(apiKey, sessionId);
  
      // Create publisher
      const publisher = OT.initPublisher();
      session.connect(token, (err) => {
        // Publish publisher
        session.publish(publisher);
      });
  
      // Create subscriber
      session.on('streamCreated', (event) => {
        session.subscribe(event.stream);
      });
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Muli', Arial;
  }
  strong {
    color: #09c;
  }
  </style>
  