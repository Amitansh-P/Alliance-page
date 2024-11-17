import React from "react";
import styled from "styled-components";

const LeaderboardContainer = styled.div`
    padding: 2rem;
    margin: 20px auto;
    max-width: 800px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.div`
    padding: 15px;
    margin-bottom: 10px;
    background: #f7f9fc;
    border-radius: 5px;
    border: 1px solid #e3e6eb;
`;

const Leaderboard = ({ suggestions }) => {
    return (
        <div>
            <LeaderboardContainer>
            <h2>Leaderboard</h2>
            {suggestions.length === 0 ? (
                <p>No suggestions available yet. Submit your details to get started!</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>What They Offer</th>
                            <th>What They Need</th>
                            <th>Suggested Topics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suggestions.map((item, index) => (
                            <ListItem key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.offer}</td>
                                <td>{item.need}</td>
                                <td>{item.suggestedTopics.join(", ")}</td>
                            </ListItem>
                        ))}
                    </tbody>
                </table>
            )}
            </LeaderboardContainer>
        </div>
    );
};

export default Leaderboard;
