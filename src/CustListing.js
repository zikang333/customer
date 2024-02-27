import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustListing = () => {
  const [empdata, empdatachange] = useState(null);
  const [custId, custIdchange] = useState("");

  const LoadEdit = (item) => {
    console.log(item);
    fetch(
      "https://api20240226154105.azurewebsites.net/api/Cust/TogglePhoneStatus/",
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(item),
      }
    )
      .then((res) => {
        //alert('Activate/Deactivate successfully.')
        //window.location.reload();
        Searchfunction(custId);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const Removefunction = (item) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(
        "https://api20240226154105.azurewebsites.net/api/Cust/DeletePhone",
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(item),
        }
      )
        .then((resp) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const Searchfunction = (id) => {
    if (id != "") {
      fetch(
        "https://api20240226154105.azurewebsites.net/api/Cust/GetCustPhoneByCustId?custId=" +
          id
      )
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          empdatachange(resp);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      fetch(
        "https://api20240226154105.azurewebsites.net/api/cust/GetAllCustPhone"
      )
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          empdatachange(resp);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch(
      "https://api20240226154105.azurewebsites.net/api/Cust/GetAllCustPhone"
    )
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Customer Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="customer/create" className="btn btn-success">
              Add New
            </Link>
          </div>
          <br />
          <br />
          <div className="form-group row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Find Customer ID"
                value={custId}
                onChange={(e) => custIdchange(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <a
                onClick={() => {
                  Searchfunction(custId);
                }}
                className="btn btn-primary"
              >
                Search
              </a>
            </div>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Customer ID</td>
                <td>Phone Number</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item, index) => (
                  <tr key={index}>
                    <td>{item.CustId}</td>
                    <td>{item.PhoneNo}</td>
                    <td>{item.Status === true ? "Active" : "Inactive"}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item);
                        }}
                        className="btn btn-info"
                      >
                        {item.Status === true ? "Deactivate" : "Activate"}
                      </a>
                      {/*                       <a
                        onClick={() => {
                          LoadDetail(item.custId);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </a> */}
                      <a
                        onClick={() => {
                          Removefunction(item);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustListing;
