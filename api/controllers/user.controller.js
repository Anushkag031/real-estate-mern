import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
    console.log("getUsers");

  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get Users" });
  }
};
export const updatedUser = async (req, res) => {
  try {
    //const users = await prisma.user.findUnique();
   // res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Users" });
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
   const user = await prisma.user.findUnique({
      where: {
        id
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get User" });
  }
};
export const deleteUser = async (req, res) => {
  try {
   // const users = await User.find();
   // res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Users" });
  }
};
