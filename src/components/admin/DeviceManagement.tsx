import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Device } from "@/utils/storage";
import AddDeviceModal from "./AddDeviceModal";
interface DeviceManagementProps {
  devices: Device[];
  onAddDevice: (device: Omit<Device, 'id' | 'name' | 'inStock' | 'addedDate'>) => void;
}
const DeviceManagement = ({
  devices,
  onAddDevice
}: DeviceManagementProps) => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white font-poppins">Device Inventory</h2>
        <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
          <DialogTrigger asChild>
            <Button className="bg-lemon hover:bg-lemon-dark text-black">
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </DialogTrigger>
          <AddDeviceModal onAddDevice={onAddDevice} onClose={() => setIsAddDeviceOpen(false)} />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(device => <Card key={device.id} className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white font-poppins">{device.name}</CardTitle>
                  <CardDescription className="text-gray-300">{device.brand} • {device.storage}</CardDescription>
                </div>
                <Badge className={device.inStock ? "bg-green-500" : "bg-red-500"}>
                  {device.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {device.images && device.images.length > 0 && <div className="grid grid-cols-3 gap-1">
                  {device.images.slice(0, 3).map((image, index) => <img key={index} src={image} alt={`${device.name} ${index + 1}`} className="w-full h-16 object-cover rounded" />)}
                </div>}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-lemon">R{device.price.toLocaleString()}</span>
                <span className="text-gray-400 line-through text-sm">R{device.originalPrice.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-300">
                <p><strong>Condition:</strong> {device.condition}</p>
                <p><strong>Added:</strong> {device.addedDate}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-slate-950">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
};
export default DeviceManagement;