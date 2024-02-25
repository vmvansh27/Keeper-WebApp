import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { AES, enc } from "crypto-js";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Note(props) {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [decryptedContent, setDecryptedContent] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

  function handleDecrypt() {
    if (password === "correctPassword") { // Replace "correctPassword" with your actual password
      const decrypted = AES.decrypt(props.content, "secretKey").toString(enc.Utf8);
      setDecryptedContent(decrypted);
      setIsDecrypted(true);
      setIsPasswordDialogOpen(false); // Close the password dialog
    } else {
      setIsPasswordCorrect(false);
    }
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    setIsPasswordCorrect(true); // Reset password error when user starts typing a new password
  }

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      {isDecrypted ? <p>{decryptedContent}</p> : <p>{props.content}</p>}
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      {!isDecrypted && (
        <>
          <button onClick={() => setIsPasswordDialogOpen(true)}>Decrypt</button>
          <Dialog open={isPasswordDialogOpen} onClose={() => setIsPasswordDialogOpen(false)}>
            <DialogTitle>Enter Password</DialogTitle>
            <DialogContent>
              <input
                type="password"
                className="password-input"
                placeholder="Enter password"
                value={password}
                onChange={handleChangePassword}
              />
              {!isPasswordCorrect && <p style={{ color: "red" }}>Incorrect password</p>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDecrypt}>Submit</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default Note;
