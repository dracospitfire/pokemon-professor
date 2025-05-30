import "./SignupForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = ({ cancelForm }) => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [formData, setFormData] = useState({
    userFirstName : '',
    userLastName  : '',
    age           : '',
    email         : '',
    address       : '',
    apt           : '',
    city          : '',
    state         : '',
    zipcode       : '',
    userName      : '',
    password      : '',
  });

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();

    // Check passwords was match
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create a new Pokemon Gym object from the formData
    const newUser = {
      userFirstName: formData.userFirstName,
      userLastName : formData.userLastName,
      age          : Number(formData.age),
      email        : formData.email,
      address      : formData.address,
      apt          : formData.apt,
      city         : formData.city,
      state        : formData.state,
      zipcode      : formData.zipcode,
      userName     : formData.userName,
      password     : formData.password,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "newuser";
      const response = await axios.post(URL, newUser);

      if (response.status === 201) {
        alert(response.data.message);
        // Reset the form fields
        resetFormFields();
        navigate("/")
      }
    } catch (err) {
      if (err.response) {
        // Backend Responses (300, 400, 404, 406, 500)
        alert(err.response.data.error);
        navigate("/", { state: { pokemonGym: newUser } });
      } else {
        // No Response (Network error or CORS issue)
        alert("No response from server. Network error or CORS issue.");
      }
    }
  };

  const resetFormFields = () => {
    setFormData({
      userFirstName : '',
      userLastName  : '',
      age           : '',
      email         : '',
      address       : '',
      apt           : '',
      city          : '',
      state         : '',
      zipcode       : '',
      userName      : '',
      password      : '',
    });
    setConfirmPassword('');
  };

  const handleInputChange = (event) => {
    const { name, type, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
        [name]: value === '' ? null : value,
    }));
  };

  return (
    <>
      <h2 className="signup">Signup</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
      <button type="button" onClick={cancelForm}>Cancel</button>
      <div>
          <label htmlFor="userName"><strong>Username:</strong></label>
          <input autoComplete="off"
            type="text"
            id="userName"
            name="userName"
            value={formData.userName || '' }
            onChange={handleInputChange}
            placeholder="NeoTheOne"
            required
          />
        </div>
        <div>
          <label htmlFor="password"><strong>Password:</strong></label>
          <input autoComplete="off"
            type="password"
            id="password"
            name="password"
            value={formData.password || '' }
            onChange={handleInputChange}
            placeholder="***********"
            required
          />
        </div>
        <div>
          <label htmlFor="password"><strong>Confrim:</strong></label>
          <input autoComplete="off"
            type="password"
            placeholder="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setConfirmTouched(true)}
            onFocus={() => setConfirmTouched(false)}
            required
          />
        </div>
        <div>
          <label htmlFor="age"><strong>Age:</strong></label>
          <input autoComplete="off"
            type="number"
            id="age"
            name="age"
            value={formData.age || '' }
            onChange={handleInputChange}
            min="13"
            max="90"
            step="1"
            placeholder="13"
            required
          />
        </div>
        <div>
          <label htmlFor="email"><strong>E-mail:</strong></label>
          <input autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={formData.email || '' }
            onChange={handleInputChange}
            placeholder="user@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="userFirstName"><strong>Name:</strong></label>
          <input autoComplete="off"
            type="text"
            id="userFirstName"
            name="userFirstName"
            value={formData.userFirstName || '' }
            onChange={handleInputChange}
            placeholder="First"
            required
          />
          <input autoComplete="off"
            type="text"
            name="userLastName"
            value={formData.userLastName || '' }
            onChange={handleInputChange}
            placeholder="Last"
            required
          />
        </div>
        <div>
          <label htmlFor="address"><strong>Address:</strong></label>
          <input autoComplete="off"
            type="text"
            id="address"
            name="address"
            value={formData.address || '' }
            onChange={handleInputChange}
            placeholder="42 Wallaby Way"
            required
          />
          <input autoComplete="off"
            type="text"
            name="apt"
            value={formData.apt || '' }
            onChange={handleInputChange}
            placeholder="APT  "
            style={{ textAlign: "center" }}
          />
        </div>
        <div>
          <label htmlFor="city"><strong>City:</strong></label>
          <input autoComplete="off"
            type="text"
            id="city"
            name="city"
            value={formData.city || '' }
            onChange={handleInputChange}
            placeholder="Sydney"
            required
          />
          <select
            name="state"
            onChange={handleInputChange}
            required
            value={formData.state || '' }
          >
            <option value="">State</option>
            <option value="Alabama">AL</option>
            <option value="Alaska">AK</option>
            <option value="Arizona">AZ</option>
            <option value="Arkansas">AR</option>
            <option value="California">CA</option>
            <option value="Colorado">CO</option>
            <option value="Connecticut">CT</option>
            <option value="Delaware">DE</option>
            <option value="Florida">FL</option>
            <option value="Georgia">GA</option>
            <option value="Hawaii">HI</option>
            <option value="Idaho">ID</option>
            <option value="Illinois">IL</option>
            <option value="Indiana">IN</option>
            <option value="Iowa">IA</option>
            <option value="Kansas">KS</option>
            <option value="Kentucky">KY</option>
            <option value="Louisiana">LA</option>
            <option value="Maine">ME</option>
            <option value="Maryland">MD</option>
            <option value="Massachusetts">MA</option>
            <option value="Michigan">MI</option>
            <option value="Minnesota">MN</option>
            <option value="Mississippi">MS</option>
            <option value="Missouri">MO</option>
            <option value="Montana">MT</option>
            <option value="Nebraska">NE</option>
            <option value="Nevada">NV</option>
            <option value="New Hampshire">NH</option>
            <option value="New Jersey">NJ</option>
            <option value="New Mexico">NM</option>
            <option value="New York">NY</option>
            <option value="North Carolina">NC</option>
            <option value="North Dakota">ND</option>
            <option value="Ohio">OH</option>
            <option value="Oklahoma">OK</option>
            <option value="Oregon">OR</option>
            <option value="Pennsylvania">PA</option>
            <option value="Rhode Island">RI</option>
            <option value="South Carolina">SC</option>
            <option value="South Dakota">SD</option>
            <option value="Tennessee">TN</option>
            <option value="Texas">TX</option>
            <option value="Utah">UT</option>
            <option value="Vermont">VT</option>
            <option value="Virginia">VA</option>
            <option value="Washington">WA</option>
            <option value="West Virginia">WV</option>
            <option value="Wisconsin">WI</option>
            <option value="Wyoming">WY</option>
          </select>
        </div>
        <div>
          <label htmlFor="city" ><strong>Zip:</strong></label>
          <input autoComplete="off" 
            type="number"
            name="zipcode"
            value={formData.zipcode || '' }
            onChange={handleInputChange}
            placeholder="12345"
            required
          />
          
          <input autoComplete="off" 
            type="number"
            name="zipcode"
            value={formData.zipcode || '' }
            onChange={handleInputChange}
            placeholder="-1234"
          />
        </div>
        <div style={{ justifyContent: "center" }}>
        {confirmTouched && formData.password && confirmPassword && (formData.password !== confirmPassword) && (
          <p style={{ color: "red" }}>Yikes, passwords do not match.</p>
        )}
        </div>
        <button type="submit" disabled={formData.password !== confirmPassword}>Submit</button>
      </form>
    </>
  ); 
}

export default SignUp;