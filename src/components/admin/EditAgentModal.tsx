
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from "@/utils/storage";

interface EditAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  onUpdateAgent: (updates: Partial<Agent>) => void;
}

const EditAgentModal = ({ isOpen, onClose, agent, onUpdateAgent }: EditAgentModalProps) => {
  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    if (agent) {
      setAgentData({
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        role: agent.role,
        username: agent.username,
        password: agent.password
      });
    }
  }, [agent]);

  const handleUpdateAgent = () => {
    onUpdateAgent(agentData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
          <DialogDescription className="text-gray-300">
            Update agent information and credentials
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-agent-name" className="text-gray-300">Full Name</Label>
              <Input 
                id="edit-agent-name" 
                value={agentData.name}
                onChange={(e) => setAgentData({...agentData, name: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
            <div>
              <Label htmlFor="edit-agent-email" className="text-gray-300">Email</Label>
              <Input 
                id="edit-agent-email" 
                type="email" 
                value={agentData.email}
                onChange={(e) => setAgentData({...agentData, email: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-agent-phone" className="text-gray-300">Phone</Label>
              <Input 
                id="edit-agent-phone" 
                value={agentData.phone}
                onChange={(e) => setAgentData({...agentData, phone: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Role</Label>
              <Select value={agentData.role} onValueChange={(value) => setAgentData({...agentData, role: value})}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
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
              <Label htmlFor="edit-agent-username" className="text-gray-300">Username</Label>
              <Input 
                id="edit-agent-username" 
                value={agentData.username}
                onChange={(e) => setAgentData({...agentData, username: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
            <div>
              <Label htmlFor="edit-agent-password" className="text-gray-300">Password</Label>
              <Input 
                id="edit-agent-password" 
                type="password"
                value={agentData.password}
                onChange={(e) => setAgentData({...agentData, password: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white" 
              />
            </div>
          </div>
          <Button 
            onClick={handleUpdateAgent}
            className="w-full bg-lemon hover:bg-lemon-dark text-black"
          >
            Update Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAgentModal;
