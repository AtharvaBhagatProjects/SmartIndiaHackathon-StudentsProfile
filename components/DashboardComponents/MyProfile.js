import { useEffect, useState } from "react";

import QRCode from "qrcode";

import { db } from "../../firebase";
import s from "../../styles/MyProfile.module.scss";

const MyProfile = (props) => {
  let [user, setUser] = useState({
    email: "",
    fullName: "",
    college: "",
    department: "",
    gender: "",
    Stack: [],
    StdID: "",
  });
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [input, setInput] = useState("");

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      user.Stack.push(e.target.value);

      setInput("");
    }
  };
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
    user.Stack = tags;
  };

  const addstack = (e) => {
    const { key } = e;

    if (key === "Enter") {
      user.Stack.push(e.target.value);
      e.target.value = "";
    }
  };
  let [colleges, setColleges] = useState([]);
  let [qr, setqr] = useState("");

  let [collegeName, setCollegeName] = useState("");
  let [departmentslist, setDepartmentList] = useState(["CS", "IT"]);

  const setDataListDept = (id) => {
    let Inboc = [];

    db.collection(`colleges`)
      .where("collegeName", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let userdetails = { ...doc.data() };
          Inboc.push(userdetails.departments);
        });
        if (Inboc.length != 0) {
          setDepartmentList(...Inboc);
        } else {
          setDataListDept(["Please Click Refresh"]);
        }
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const setQR = () => {
    QRCode.toDataURL(props.userUUID).then((data) => setqr(data));
  };
  const getData = () => {
    let Inboc = [];
    db.collection(`users`)
      .doc(props.userUUID)
      .get()
      .then((doc) => {
        let userdetails = { ...doc.data() };
        Inboc.push(userdetails);
        setUser(...Inboc);
      });
    db.collection(`colleges`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let userdetails = { ...doc.data() };
          Inboc.push(userdetails);
        });
        setColleges(Inboc);
      });
  };

  const UpdateUser = () => {
    db.collection(`users`).doc(props.userUUID).update(user);
  };

  useEffect(() => {
    setTimeout(() => getData(), 10);
    setTimeout(() => setQR(), 10);
  }, []);
  return (
    <div className={s.MainHolder}>
      <div className={s.Form}>
        <h1>Setup Your Profile</h1>
        <div className={s.InputBox}>
          <h2>Name : </h2>
          <input
            value={user.fullName}
            name="fullName"
            placeholder="Enter Your Name"
            onChange={handleChange}
          ></input>
        </div>
        <div className={s.InputBox}>
          <h2>Email : </h2>
          <input
            value={user.email}
            placeholder="Enter Your Email"
            readOnly
          ></input>
        </div>
        <div className={s.InputBox}>
          <h2>College : </h2>
          <input
            list="colleges"
            value={user.college}
            placeholder="Enter Your College"
            name="college"
            onChange={(e) => {
              setCollegeName(e.target.value);
              setDataListDept(collegeName);
              handleChange(e);
            }}
          ></input>
          <datalist id="colleges" className={s.datalist}>
            {colleges.map((college) => (
              <option className={s.option} value={college.collegeName}>
                {college.collegeName}
              </option>
            ))}
          </datalist>
        </div>

        <div className={s.InputBox}>
          <h2>
            Department :{" "}
            <button
              onClick={() => {
                setDataListDept(collegeName);
              }}
            >
              <img src="/refresh.png" />
            </button>
          </h2>

          <input
            list="departments"
            value={user.department}
            onChange={handleChange}
            placeholder=" <- Click Refresh Icon on the side"
            name="department"
          ></input>
          <datalist id="departments" className={s.datalist}>
            {departmentslist.map((dept) => (
              <option className={s.option} value={dept}>
                {dept}
              </option>
            ))}
          </datalist>
        </div>
        <div className={s.InputBox}>
          <h2>Student ID : </h2>
          <input
            value={user.StdID}
            name="StdID"
            placeholder="Enter Your Student ID"
            onChange={handleChange}
          ></input>
        </div>
        <div className={s.InputBox}>
          <h2>Gender : </h2>
          <select name="gender" value={user.gender} onChange={handleChange}>
            <option value="Select">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>
        </div>
        <div className={s.InputBox}>
          <h2>Skills :</h2>

          <input
            type="text"
            placeholder="Add Skills"
            autoFocus={true}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onChange={onChange}
            value={input}
          ></input>
        </div>
        <div className={s.stackTags}>
          {user.Stack.map((tag, index) => (
            <p onClick={() => deleteTag(index)}>
              {tag} <b> x </b>
            </p>
          ))}
        </div>
        <button className="SaveButton" onClick={() => UpdateUser()}>
          Save Changes
        </button>
      </div>
      <div className={s.QRShow}>
        <div className={s.ImageBox}>
          <img src={qr} />
          <img
            className={s.ava}
            src={`https://avatars.dicebear.com/api/jdenticon/${props.userUUID}.svg`}
          />
        </div>
        <h2>{user.fullName}</h2>
        <h3>{user.college}</h3>
        <h3>Department of {user.department}</h3>
        <h4>{user.email}</h4>
        <hr />
        <h3>Skills</h3>
        <div className="stackTags2">
          {user.Stack.map((tag, index) => (
            <p> {tag} </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
