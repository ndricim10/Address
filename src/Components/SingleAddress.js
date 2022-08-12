import React, { useState } from "react";
import { useEffect } from "react";
import "./Single.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAddressById } from "../Redux/Actions";
import EditAddress from "./EditAddress";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "./DragHandle";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import AddAddress from "./AddAddress";
import { AgGridReact } from "ag-grid-react";
import request from "../api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function SingleAddress() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAddressById(id));
  }, [id]);

  const { address } = useSelector((state) => state.addressById),
    [editJobSite, setEditJobSite] = useState(false),
    [addJobSite, setAddJobSite] = useState(false),
    [number, setNumber] = useState(""),
    [item, setItem] = useState(""),
    [Quantity, setQuantity] = useState(""),
    [Description, setDescription] = useState(""),
    [Notes, setNotes] = useState(""),
    [index, setIndex] = useState(null);

  const searchDivStyle = { backgroundColor: "#dedede", padding: 10 };
  const searchStyle = {
    width: "100%",
    padding: "10px 20px",
    borderRadius: 20,
    outline: 0,
    border: "2px #68bf40 solid",
    fontSize: "100%",
  };

  let newArray = address?.items?.filter(() => [...address.items]);
  address?.items?.sort((a, b) => a.number - b.number);

  function editAddress(item, number, quantity, description, notes) {
    newArray?.filter((i, index_) => {
      if (i.number === number) {
        setEditJobSite(true);
        setItem(item);
        setNumber(parseInt(number));
        setQuantity(quantity);
        setDescription(description);
        setNotes(notes);
        setIndex(index_);
      }
    });
  }
  function deleteAddress(number) {
    newArray?.filter((i, index) => {
      if (i.number === number) {
        setIndex(index);
        address.items?.splice(index, 1);
        const obj = {
          name: address.name,
          status: address.status,
          items: [...address.items],
          categories: address.categories,
        };

        request.put(`/Address/${id}`, obj);

        setTimeout(() => {
          dispatch(getAddressById(id));
        }, 1);
      }
    });
  }
  function addAdressModal() {
    setAddJobSite(true);
  }

  newArray = address?.items?.filter((element, i) => {
    const isDuplicate = newArray.includes(element.number);
    if (!isDuplicate) {
      newArray.push(element.number);
      return true;
    }
  });

  const [rowData, setRowData] = useState("");
  const [gridApi, setGridApi] = useState();
  
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const defColumns = [
    { field: "number", headerName: "Nr", sortable: true },
    { field: "item", headerName: "Item", sortable: true },
    { field: "Quantity", sortable: true },
    { field: "Description", sortable: true },
    { field: "notes", sortable: true },
    {
      field: "Actions",
      cellRenderer: (params) => (
        <div>
          {" "}
          <AiFillEdit
            className="edit_td"
            size={25}
            onClick={() =>
              editAddress(
                params.data.item,
                params.data.number,
                params.data.Quantity,
                params.data.Description,
                params.data.notes
              )
            }
          />
          <AiFillDelete
            size={25}
            className="delete_td"
            onClick={() => deleteAddress(params.data.number)}
          />
        </div>
        // console.log(params.data)
      ),
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    const columns = Object.keys(rowData[0])?.map((key) => ({ field: key }));
    params.api.setColumnDefs(columns);
    setGridColumnApi(params.columnApi);
  };

  function gettingData() {
    fetch(`http://localhost:3000/Address/${id}`)
      .then((res) => res.json())
      .then((data) => setRowData(data.items));
  }
  useEffect(() => {
    gettingData();
  }, [id]);

  const onFilterTextChange=(e)=>{
    gridApi.setQuickFilter(e.target.value)
  }

  return (
    <>
      <div className="inventory_grid">
        {editJobSite && (
          <EditAddress
            index={index}
            editJobSite={editJobSite}
            newArray={newArray}
            id={id}
            address={address}
            setItem={setItem}
            setDescription={setDescription}
            setQuantity={setQuantity}
            setNotes={setNotes}
            number={number}
            setEditJobSite={setEditJobSite}
          />
        )}

        {addJobSite && (
          <AddAddress
            addJobSite={addJobSite}
            newArray={newArray}
            id={id}
            address={address}
            number={number}
            setAddJobSite={setAddJobSite}
          />
        )}
        <div className="left-section">
          <div className="title">{address.name}</div>
          <div className="categories">
            {address.categories?.map((ad, i) => {
              return <span key={i}>{ad}</span>;
            })}
          </div>
        </div>
        <div className="right-section">
          <div className="data-grid">DATA GRID</div>
          <DragDropContext
            onDragEnd={(param) => {
              const srcI = param.source.index;
              const desI = param.destination?.index;
              if (desI) {
                newArray.splice(desI, 0, newArray.splice(srcI, 1)[0]);
                //   newArray.saveList(newArray);
              }
            }}
          >
            <table>
              <tbody>
                <tr>
                  <th>Nr.</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Notes</th>
                </tr>
              </tbody>
              <Droppable droppableId="droppable-1">
                {(provided) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {newArray?.map((item, i) => {
                      return (
                        <Draggable
                          key={item.number}
                          index={i}
                          draggableId={"draggable-" + item.number}
                        >
                          {(provided, snapshot) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="tr_notes"
                              onDoubleClick={() =>
                                editAddress(
                                  item.item,
                                  item.number,
                                  item.Quantity,
                                  item.Description,
                                  item.notes
                                )
                              }
                              style={{
                                ...provided.draggableProps.style,
                                boxShadow: snapshot.isDragging
                                  ? "0 0 .1rem #666"
                                  : null,
                              }}
                            >
                              <td>
                                <DragHandle {...provided.dragHandleProps} />
                                {item.number}
                              </td>
                              <td>{item.item}</td>
                              <td>{item.Quantity}</td>
                              <td>{item.Description}</td>
                              <td>{item.notes}</td>
                              <td
                                onClick={() =>
                                  editAddress(
                                    item.item,
                                    item.number,
                                    item.Quantity,
                                    item.Description,
                                    item.notes
                                  )
                                }
                              >
                                <AiFillEdit />
                              </td>
                              <td
                                className="delete_td"
                                onClick={() => deleteAddress(item.number)}
                              >
                                <AiFillDelete />
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
          <div className="create_td" onClick={addAdressModal}>
            <div className="create_flex">
              <IoMdCreate size={30} />
            </div>
          </div>
        </div>
      </div>
      <div style={searchDivStyle}>
      <input type="search" style={searchStyle} onChange={onFilterTextChange} placeholder="search somethings..."/>
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: 1250 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={defColumns}
          onGridReady={onGridReady}
        ></AgGridReact>
        <div className="absolute_add">
          <div className="create_td" onClick={addAdressModal}>
            <div className="create_flex">
              <IoMdCreate size={30} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
