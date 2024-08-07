'use client'
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";


export default function Home() {
  const [inventory, setInventory]=useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
//update
const updateInventory = async () => {
  const snapshot = query(collection(firestore, "inventory"));
  const docs = await getDocs(snapshot);
  const inventoryList = [];

  docs.forEach((doc) => {
    inventoryList.push({
      name: doc.id,
      ...doc.data()
    });
  });
  setInventory(inventoryList);
};

//add
const addItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) { 
    const { quantity } = docSnap.data();
    await setDoc(docRef, { quantity: quantity + 1 });
  } else {
    await setDoc(docRef, { quantity: 1 });
  };
  await updateInventory();
};


//remove
const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { quantity } = docSnap.data();
    if (quantity === 1) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { quantity: quantity - 1 });
    }
  }
  await updateInventory();
};


 useEffect(() => {
   updateInventory()
 }, [])
 const handleOpen = () => setOpen(true)
 const handleClose = () => setOpen(false)


 return(
   <Box
     width="100vw"
     height="100vh"
     display="flex"
     flexDirection="column"
     justifyContent="center"
     alignItems="center"
     gap={2}
   >
     <Modal open={open} onClose= {handleClose}>
       <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border={'2px solid black'}
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{transform: 'translate(-50%,-50%)',}}
      >
         <Typography variant="h6">Add item </Typography>
         <Stack width="100%" direction="row" spacing={2}>
           <TextField
             variant='outlined'
             fullWidth
             value={itemName}
             onChange={(e)=>{
               setItemName(e.target.value)
             }}
           />
           <Button variant="outlined" onClick={()=>{
             addItem(itemName)
             setItemName('')
             handleClose()
             }}>ADD
           </Button>
         </Stack>
       </Box>
     </Modal>
     <Button variant = "contained" onClick={()=>{
       handleOpen()
       }}
     >
      ADD NEW ITEM
     </Button>
     <Box border="1px solid black">
       <Box
         width="800px"
         height="100px"
         bgcolor="skyblue"
         display="flex"
         alignItems="center"
         justifyContent="center"
       >
         <Typography variant="h5">
           INVENTORY
         </Typography>
       </Box>
     <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
     {
         inventory.map(({name, quantity}) =>{
           return <Box
             key={name}
             width="100%"
             minHeight="150px"
             display="flex"
             alignItems="center"
             justifyContent="space-between"
             bgcolor="grey"
             padding={6}
           >
            <Typography variant='h3' color="black" textAlign='center'>
            {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant='h3' color="black" textAlign='center'>
              {quantity}
            </Typography>
            <Button variant="contained" 
              onClick={()=>{
              removeItem(name)
              }}
            >
                Remove
            </Button>
            <Stack direction="row" spacing={2}>
                  <Button variant="contained"
                    onClick={() => {
                      addItem(name)
                    }}>ADD 1</Button>
                  <Button variant="contained"
                    onClick={() => {
                      removeItem(name)
                    }}> Remove 1</Button>
                </Stack>

           </Box>
         })
       }
     </Stack>
     </Box>
 </Box>
 )
}
