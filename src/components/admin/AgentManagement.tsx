
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { Agent } from "@/utils/storage";
import CreateAgentModal from "./CreateAgentModal";
import EditAgentModal from "./EditAgentModal";

interface AgentManagementProps {
  agents: Agent[];
  onCreateAgent: (agent: Omit<Agent, 'id' | 'status' | 'assignedDevices' | 'completedAssessments' | 'joinDate'>) => void;
  onUpdateAgent: (agentId: string, updates: Partial<Agent>) => void;
  onDeleteAgent: (agentId: string) => void;
}

const AgentManagement = ({ agents, onCreateAgent, onUpdateAgent, onDeleteAgent }: AgentManagementProps) => {
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsEditAgentOpen(true);
  };

  const handleUpdateAgent = (updates: Partial<Agent>) => {
    if (selectedAgent) {
      onUpdateAgent(selectedAgent.id, updates);
      setIsEditAgentOpen(false);
      setSelectedAgent(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white font-poppins">Agent Management</h2>
        <Dialog open={isCreateAgentOpen} onOpenChange={setIsCreateAgentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lemon hover:bg-lemon-dark text-black">
              <UserPlus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          </DialogTrigger>
          <CreateAgentModal onCreateAgent={onCreateAgent} onClose={() => setIsCreateAgentOpen(false)} />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white font-poppins">{agent.name}</CardTitle>
                  <CardDescription className="text-gray-300">{agent.role}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(agent.status)} text-white`}>
                  {agent.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-300">
                <p><strong>ID:</strong> {agent.id}</p>
                <p><strong>Username:</strong> {agent.username}</p>
                <p><strong>Email:</strong> {agent.email}</p>
                <p><strong>Phone:</strong> {agent.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lemon font-bold text-lg">{agent.assignedDevices}</p>
                  <p className="text-gray-400 text-xs">Assigned</p>
                </div>
                <div>
                  <p className="text-lemon font-bold text-lg">{agent.completedAssessments}</p>
                  <p className="text-gray-400 text-xs">Completed</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300"
                  onClick={() => handleEditAgent(agent)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600"
                  onClick={() => onDeleteAgent(agent.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAgent && (
        <EditAgentModal
          isOpen={isEditAgentOpen}
          onClose={() => {
            setIsEditAgentOpen(false);
            setSelectedAgent(null);
          }}
          agent={selectedAgent}
          onUpdateAgent={handleUpdateAgent}
        />
      )}
    </div>
  );
};

export default AgentManagement;
