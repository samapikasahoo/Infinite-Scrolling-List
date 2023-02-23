import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

const CONTACT_LIST_PER_PAGE = 25; // Number of items to load at a time when we make API Call.
const API_URL = "https://randomuser.me/api/?results=500"; // This is the API endpoint where we are getting the data.

export const ContactList = () => {
  const [loading, setLoading] = useState(false); // Flag to track loading state of application.
  const [items, setItems] = useState([]); // Array of loaded items
  const [page, setPage] = useState(1); // In this state we are maintaining a page number.

  useEffect(() => {
    // This is the loadItems Function to load items from the API endpoint.
    const loadItems = async () => {
      setLoading(true);
      const response = await fetch(API_URL); // Fetch data from API
      const data = await response.json(); // Parse data as JSON
      setItems(data.results.slice(0, CONTACT_LIST_PER_PAGE)); // Load first page of items
      setLoading(false); // Set loading flag to false
    };
    loadItems();
  }, []);

  //This function is called when the onScroll event triggered.
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const diff = scrollHeight - scrollTop - clientHeight;
    if (diff < 50 && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  useEffect(() => {
    // Function to load more items when user scrolls to end of page
    const loadMoreItems = async () => {
      setLoading(true);
      const response = await fetch(
        API_URL + `&page=${page}&results=${CONTACT_LIST_PER_PAGE}`
      ); // Fetch data from API with pagination
      const data = await response.json();
      setItems((prevItems) => [
        ...prevItems,
        ...data.results.slice(0, CONTACT_LIST_PER_PAGE),
      ]); // Add new items to existing ones in the page
      setLoading(false);
    };

    if (page > 1) {
      setTimeout(() => {
        loadMoreItems(); // Load more items if user has scrolled to end of page and shows loading status for 1 second.
      }, 1000);
    }
  }, [page]);

  const skeletonItems = new Array(CONTACT_LIST_PER_PAGE).fill(null);
  return (
    <div
      onScroll={handleScroll}
      style={{
        height: "100vh",
        overflowY: "scroll",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        {loading &&
          skeletonItems.map((_, index) => (
            <Card
              key={index}
              style={{ width: "100%", border: "none", marginBottom: "16px" }}
            >
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    marginRight: "16px",
                    backgroundColor: "#E0E0E0",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    margin: 0,
                    backgroundColor: "#E0E0E0",
                    height: "20px",
                  }}
                />
              </Card.Body>
            </Card>
          ))}
        {!loading &&
          items.map((item) => (
            <Card
              key={item.login.uuid}
              style={{ width: "100%", border: "none", marginBottom: "16px" }}
            >
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Card.Img
                  src={item.picture.thumbnail}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    marginRight: "16px",
                  }}
                />
                <Card.Text
                  style={{ flex: 1, margin: 0 }}
                >{`${item.name.first} ${item.name.last}`}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "16px",
            }}
          >
            <Spinner
              animation="border"
              variant="danger"
              size="lg"
              role="status"
            >
              <span className="sr-only"></span>
            </Spinner>
            <h3>Loading Data...</h3>
          </div>
        )}
      </div>
    </div>
  );
};
