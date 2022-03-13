import s from "../../styles/Colleagues.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

const Colleagues = (props) => {
  let [colleaguesArray, setColleaguesArray] = useState([
    {
      email: "",
      fullName: "",
      college: "",
      department: "",
      gender: "",
      Stack: [],
    },
  ]);

  const getData = () => {
    let Inboc = [];
    db.collection(`users`)
      .doc(props.userUUID)
      .get()
      .then((doc) => {
        let userdetails = { ...doc.data() };
        // alert(userdetails.college);

        db.collection(`users`)

          .where("college", "==", userdetails.college)

          .where("department", "==", userdetails.department)

          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              let userdetails = doc.data();
              if (userdetails.uuid == props.userUUID) {
              } else {
                Inboc.push(userdetails);
              }
            });
            setColleaguesArray(Inboc);
          });
      });
  };

  useEffect(() => {
    setTimeout(() => getData(), 10);
  }, []);
  return (
    <div className={s.Contain}>
      {colleaguesArray.map((person) => (
        <div className={s.ColleagueCard}>
          <img
            src={`https://avatars.dicebear.com/api/jdenticon/${person.uuid}.svg`}
          />
          <div className={s.details}>
            <h1>{person.fullName}</h1>
            <h3>{person.email}</h3>
            <h5>
              College {">"} {person.college} / {person.department}
            </h5>
            <h5>
              Gender {">"} {person.gender.charAt(0).toUpperCase()}
            </h5>
          </div>
          <div className="stackTags">
            {person.Stack.map((tag, index) => (
              <p> {tag} </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Colleagues;
