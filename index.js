const {
  listContacts,
  getContactById,
  removeContact,

  addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("List Contacts: ");
      console.log(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {
        console.log(`Contact with id=${id} not found!`);
        throw new Error(`Contact with id=${id} not found!`);
      }
      console.log(`Contact with id=${id}:`);
      console.log(contactById);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log("Not all the information is given!");
        throw new Error(`Not all the information is given!`);
      }
      const addedContact = await addContact(name, email, phone);
      console.log("Contact successfully added:");
      console.log(addedContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      if (!deletedContact) {
        console.log(`Contact with id=${id} not found!`);
        throw new Error(`Contact with id=${id} not found!`);
      }
      console.log(`Contact with id=${id} deleted successfully:`);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(options);
