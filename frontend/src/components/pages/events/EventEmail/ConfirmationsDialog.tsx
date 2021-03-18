import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Link } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { SendEmailProps } from ".";
import ClearIcon from "@material-ui/icons/Clear";

interface ConfirmationDialogProps {
  showConfirmation: boolean;
  setShowConfirmation: Dispatch<SetStateAction<boolean>>;
  emailProps: SendEmailProps;
  handleConfirmationClose: () => void;
}

const ConfirmationDialog = ({
  showConfirmation,
  setShowConfirmation,
  emailProps,
  handleConfirmationClose,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={showConfirmation}
      onClose={(_e) => setShowConfirmation(false)}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Mail sendt</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>
            {`Mail sendt til følgende ${
              emailProps.receiverEmails.length > 1 ? emailProps.receiverEmails.length : ""
            }  adresse${emailProps.receiverEmails.length > 1 ? "r" : ""}:`}
          </b>
        </DialogContentText>

        {emailProps.receiverEmails.map((email, index) => (
          <DialogContentText key={index} component="div">
            {email}
          </DialogContentText>
        ))}

        <DialogContentText variant="body2">
          Kontakt <Link href="mailto:web@indokhs.no">web@indokhs.no</Link> dersom det skulle oppstå spørsmål.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<ClearIcon />} onClick={(_e) => handleConfirmationClose()} color="primary">
          Lukk
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;