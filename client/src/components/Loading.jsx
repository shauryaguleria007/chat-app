import { Box } from "@mui/material"
import "./loading.css"
export const Loading = () => {
    return <Box
        height="100vh"
        width="100vw"
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}>
        <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
    </Box>
}