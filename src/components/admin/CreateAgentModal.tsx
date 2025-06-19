
import { useState } from "react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from "@/utils/storage";

interface CreateAgentModalProps {
  onCreateAgent: (agent: Omit<Agent, 'id' | 'status' | 'assignedDevices' | 'completedAssessments' | 'joinDate'>) => void;
  onClose: () => void;
}

const CreateAgentModal = ({ onCreateAgent, onClose }: CreateAgentModalProps) => {
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    username: "",
    password: ""
  });

  const handleCreateAgent = () => {
    onCreateAgent(newAgent);
    setNewAgent({ name: "", email: "", phone: "", role: "", username: "", password: "" });
    onClose();
  };

  return (
    <DialogContent className="bg-gray-800 border-gray-700 text-white">
      <DialogHeader>
        <DialogTitle>Create New Agent</DialogTitle>
        <DialogDescription className="text-gray-300">
          Add a new agent with login credentials
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="agent-name" className="text-gray-300">Full Name</Label>
            <Input 
              id="agent-name" 
              value={newAgent.name}
              onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="agent-email" className="text-gray-300">Email</Label>
            <Input 
              id="agent-email" 
              type="email" 
              value={newAgent.email}
              onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="agent-phone" className="text-gray-300">Phone</Label>
            <Input 
              id="agent-phone" 
              placeholder="+27 82 123 4567" 
              value={newAgent.phone}
              onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
          <div>
            <Label className="text-gray-300">Role</Label>
            <Select value={newAgent.role} onValueChange={(value) => setNewAgent({...newAgent, role: value})}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Agent">Agent</SelectItem>
                <SelectItem value="Senior Agent">Senior Agent</SelectItem>
                <SelectItem value="Supervisor">Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="agent-username" className="text-gray-300">Username</Label>
            <Input 
              id="agent-username" 
              value={newAgent.username}
              onChange={(e) => setNewAgent({...newAgent, username: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="agent-password" className="text-gray-300">Password</Label>
            <Input 
              id="agent-password" 
              type="password"
              value={newAgent.password}
              onChange={(e) => setNewAgent({...newAgent, password: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
        </div>
        <Button 
          onClick={handleCreateAgent}
          className="w-full bg-lemon hover:bg-lemon-dark text-black"
        >
          Create Agent
        </Button>
      </div>
    </DialogContent>
  );
};

export default CreateAgentModal;
