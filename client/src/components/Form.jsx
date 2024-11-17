import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 600px;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    resize: none;
`;

const StyledButton = styled.button`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:disabled {
        background-color: #ccc;
    }
`;

const Form = ({ setSuggestions = () => {} }) => {
    const [formData, setFormData] = useState({ name: "", offer: "", need: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/connections/suggestions", formData);
            console.log("Response from API:", response.data);
            setSuggestions(response.data.suggestions);
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            setError("Failed to fetch suggestions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Container>
            <form onSubmit={handleSubmit}>
                <StyledInput
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <StyledTextarea
                    name="offer"
                    placeholder="What You Can Offer"
                    value={formData.offer}
                    onChange={handleChange}
                    required
                />
                <StyledTextarea
                    name="need"
                    placeholder="What You Need"
                    value={formData.need}
                    onChange={handleChange}
                    required
                />
                <StyledButton type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </StyledButton>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            </Container>
        </div>
    );
};

export default Form;
