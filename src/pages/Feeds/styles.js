import styled from "styled-components";

export const Post = styled.View`
    margin-top: 10px;
`;

export const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px;
`;

export const Description = styled.Text`
    padding: 15px;
    line-height: 18px;
`;

export const Name = styled.Text`
    color: #333;
    font-weight: bold;
`;

// ActivityIndicator -> É o Sinal de load do react-native que se adapta conforme a plataform onde o app vai rodar
export const Loading = styled.ActivityIndicator.attrs({
    size: "small",
    color: "#999",
})
`
    margin: 30px 0px;
`;