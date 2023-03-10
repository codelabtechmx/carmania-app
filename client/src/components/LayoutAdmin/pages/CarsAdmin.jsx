import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Edit, Delete } from "@mui/icons-material";
import loading from "../../../assets/loading.gif";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Button,
  TextField,
} from "@mui/material";

const API_URL = "http://localhost:3001/cars/";

function CarsAdmin() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // <--------------Treaer info Api--------------->
  const dataInfo = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    dispatch(dataInfo);
  }, [dispatch]);
  // <--------------Modificar los estados al Editar--------------->
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [carSelected, setCarSelected] = useState({
    type: "",
    brand: "",
    model: "",
    image: "",
    price: "",
    year: "",
    description: "",
    category: "",
    location: "",
    fuelConsumption: "",
    doors: "",
    color: "",
    mileage: "",
    fuelType: "",
    transissionType: "",
    active: "",
    status: "",
  });
  function handleChange(e) {
    setCarSelected({ ...carSelected, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }
  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };
  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };
  function selectCar(c, caso) {
    setCarSelected(c);
    caso === "Edit" ? openCloseModalEdit() : openCloseModalDelete();
  }

  const BanearCar = async () => {
    await axios.put(API_URL + carSelected._id, carSelected).then((response) => {
      var dataNew = data;
      console.log(dataNew);
      dataNew.map((c) => {
        if (carSelected._id === c._id) {
          c.status = carSelected.status;
        }
      });
      setData(dataNew);
      openCloseModalDelete();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "The car has been deactivated successfully",
        showConfirmButton: false,
        timer: 3000,
      });
    });
  };
  const EditInfo = async () => {
    await axios.put(API_URL + carSelected._id, carSelected).then((response) => {
      var dataNew = data;
      dataNew.map((c) => {
        if (carSelected._id === c._id) {
          c.type = carSelected.type;
          c.brand = carSelected.brand;
          c.model = carSelected.model;
          c.price = carSelected.price;
          c.description = carSelected.description;
          c.category = carSelected.category;
          c.location = carSelected.location;
          c.fuelConsumption = carSelected.fuelConsumption;
          c.doors = carSelected.doors;
          c.color = carSelected.color;
          c.year = carSelected.year;
          c.mileage = carSelected.mileage;
          c.fuelType = carSelected.fuelType;
          c.transissionType = carSelected.transissionType;
          c.active = carSelected.active;
          c.status = carSelected.status;
        }
      });
      setData(dataNew);
      openCloseModalEdit();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "The car has been successfully modified",
        showConfirmButton: false,
        timer: 3000,
      });
    });
  };
  const bodyEdit = (
    <div className="bg-white  pl-2 pr-2">
      <h3 className="text-center pt-4 font-bold text-2xl">EDIT CARS</h3>
      <br />
      <TextField
        name="type"
        margin="normal"
        fullWidth
        label="type"
        onChange={handleChange}
        value={carSelected && carSelected.type}
      />
      <br />
      <TextField
        name="brand"
        margin="normal"
        fullWidth
        label="brand"
        onChange={handleChange}
        value={carSelected && carSelected.brand}
      />
      <br />
      <TextField
        name="model"
        margin="normal"
        fullWidth
        label="model"
        onChange={handleChange}
        value={carSelected && carSelected.model}
      />
      <br />
      <TextField
        name="price"
        margin="normal"
        fullWidth
        label="price"
        onChange={handleChange}
        value={carSelected && carSelected.price}
      />
      <br />
      <TextField
        name="description"
        margin="normal"
        fullWidth
        label="description"
        onChange={handleChange}
        value={carSelected && carSelected.description}
      />
      <br />
      <TextField
        name="category"
        margin="normal"
        fullWidth
        label="category"
        onChange={handleChange}
        value={carSelected && carSelected.category}
      />
      <TextField
        name="location"
        margin="normal"
        fullWidth
        label="location"
        onChange={handleChange}
        value={carSelected && carSelected.location}
      />
      <br />
      <TextField
        name="fuelConsumption"
        margin="normal"
        fullWidth
        label="fuelConsumption"
        onChange={handleChange}
        value={carSelected && carSelected.fuelConsumption}
      />
      <br />
      <TextField
        name="doors"
        margin="normal"
        fullWidth
        label="doors"
        onChange={handleChange}
        value={carSelected && carSelected.doors}
      />
      <br />
      <TextField
        name="color"
        margin="normal"
        fullWidth
        label="color"
        onChange={handleChange}
        value={carSelected && carSelected.color}
      />
      <br />
      <TextField
        name="year"
        margin="normal"
        fullWidth
        label="year"
        onChange={handleChange}
        value={carSelected && carSelected.year}
      />
      <br />
      <TextField
        name="mileage"
        margin="normal"
        fullWidth
        label="mileage"
        onChange={handleChange}
        value={carSelected && carSelected.mileage}
      />
      <br />
      <TextField
        fullWidth
        select
        label="Type Of Fuel"
        value={carSelected && carSelected.fuelType}
        name="fuelType"
        margin="normal"
        onChange={handleChange}
      >
        <MenuItem value="gasoline">Gasoline</MenuItem>
        <MenuItem value="gas">Gas</MenuItem>
        <MenuItem value="hibrid">Hibrid</MenuItem>
      </TextField>
      <br />
      <TextField
        fullWidth
        select
        label="transissionType"
        value={carSelected && carSelected.transissionType}
        name="transissionType"
        margin="normal"
        onChange={handleChange}
      >
        <MenuItem value="automatic">automatic</MenuItem>
        <MenuItem value="Handbook">HandBook</MenuItem>
        <MenuItem value="semiautomatic">Semiautomatic</MenuItem>
      </TextField>
      <br />
      <fieldset>
        <legend>Status</legend>
        <RadioGroup
          row
          name="status"
          value={carSelected && carSelected.status}
          style={{ marginLeft: "200px" }}
          onChange={handleChange}
        >
          <FormControlLabel
            value={"valid"}
            control={<Radio size="small" />}
            label="Valid"
          />
          <FormControlLabel
            value={"invalid"}
            control={<Radio size="small" />}
            label="Invalid"
          />
        </RadioGroup>
      </fieldset>
      <br />
      <fieldset>
        <legend>Active</legend>
        <RadioGroup
          row
          name="active"
          value={carSelected && carSelected.active}
          style={{ marginLeft: "200px" }}
          onChange={handleChange}
        >
          <FormControlLabel
            value={"valid"}
            control={<Radio size="small" />}
            label="Valid"
          />
          <FormControlLabel
            value={"invalid"}
            control={<Radio size="small" />}
            label="Invalid"
          />
        </RadioGroup>
      </fieldset>
      <br />
      <div className="text-center pb-4">
        <Button variant="contained" color="success" onClick={EditInfo}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={openCloseModalEdit}>
          Cancel
        </Button>
      </div>
    </div>
  );
  const bodyDelete = (
    <div className="bg-white  pl-2 pr-2">
      <p className="text-center pt-12 pb-10 font-bold text-2xl ">
        To confirm if you want to deactivate the car{" "}
        <b>{carSelected && carSelected.model}</b> select the invalid option
      </p>
      <fieldset>
        <RadioGroup
          row
          name="status"
          value={carSelected && carSelected.status}
          style={{ marginLeft: "300px" }}
          onChange={handleChange}
        >
          <FormControlLabel
            value={"invalid"}
            control={<Radio size="small" />}
            label="Invalid"
          />
        </RadioGroup>
      </fieldset>
      <div className="text-center pt-4 pb-4 ">
        <Button variant="contained" color="success" onClick={BanearCar}>
          Yes
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={openCloseModalDelete}
        >
          No
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <div className="flex font-bold text-3xl">
        {/* <Link to="/dashboard/create-car">
            <button
              type="button"
              className="absolute top-20 right-4 flex px-6 py-2.5 bg-primary text-[#023047] font-bold  text-xs leading-tight uppercase rounded shadow-md hover:bg-[#219EBC] hover:shadow-lg focus:bg-[#219EBC] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg  duration-150 ease-in-out"
            >
              Create new car
            </button>
          </Link> */}
      </div>
      <div className="bg-white mt-[40px]">
        <TableContainer>
          <Table>
            <TableHead className="bg-[#8ECAE6]">
              <TableRow>
                {/* <TableCell>Id</TableCell> */}
                <TableCell>Type</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Doors</TableCell>
                <TableCell>TransissionType</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                {/* <TableCell>Colour</TableCell> */}
                <TableCell>Status</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Accions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody key="">
              {data.length !== 0 ? (
                data.map((c) => {
                  return (
                    <TableRow key={c.id}>
                      {/* <TableCell>{c._id}</TableCell> */}
                      <TableCell>{c.type}</TableCell>
                      <TableCell>{c.model}</TableCell>
                      <TableCell>{c.doors}</TableCell>
                      <TableCell>{c.transissionType}</TableCell>
                      <TableCell>{c.category}</TableCell>
                      <TableCell>{c.price}</TableCell>
                      {/* <TableCell>{c.colour}</TableCell> */}
                      <TableCell>{c.status}</TableCell>
                      <TableCell>{c.active}</TableCell>
                      <TableCell>
                        <Edit
                          className="cursor-pointer"
                          color="primary"
                          onClick={() => selectCar(c, "Edit")}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <Delete
                          onClick={() => selectCar(c, "Delete")}
                          color="error"
                          className="cursor-pointer"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <img className="items-center" src={loading} alt="loading" />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          className="rounded-[10px] mt-40 overflow-y-scroll  w-[600px] h-[60%] top-0 left-0 right-0 fixed m-auto scroll-m-2  border-2 border-[#000]  "
          open={modalEdit}
          onClose={openCloseModalEdit}
        >
          {bodyEdit}
        </Modal>
        <Modal
          className=" mt-40  w-[700px] h-[33%] top-0 left-0 right-0 fixed m-auto scroll-m-2"
          open={modalDelete}
          onClose={() => openCloseModalDelete()}
        >
          {bodyDelete}
        </Modal>
      </div>
    </>
  );
}

export default CarsAdmin;
