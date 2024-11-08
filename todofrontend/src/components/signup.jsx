import React from 'react';

const Signup = ({ signup }) => {
  const handleSignup = () => {
    // Logic for signing up and setting the user
    const user = 'NewUser'; // Replace with actual logic
    signup(user);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
