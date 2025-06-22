
import { useState } from "react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Device } from "@/utils/storage";

interface AddDeviceModalProps {
  onAddDevice: (device: Omit<Device, 'id' | 'name' | 'inStock' | 'addedDate'>) => void;
  onClose: () => void;
}

const AddDeviceModal = ({ onAddDevice, onClose }: AddDeviceModalProps) => {
  const [newDevice, setNewDevice] = useState({
    type: "",
    brand: "",
    model: "",
    condition: "",
    storage: "",
    ram: "",
    price: "",
    originalPrice: "",
    images: [] as string[]
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setNewDevice({
        ...newDevice,
        images: [...newDevice.images, ...imageUrls].slice(0, 3)
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = newDevice.images.filter((_, i) => i !== index);
    setNewDevice({ ...newDevice, images: newImages });
  };

  const handleAddDevice = () => {
    const deviceData = {
      ...newDevice,
      price: parseInt(newDevice.price),
      originalPrice: parseInt(newDevice.originalPrice)
    };
    
    onAddDevice(deviceData);
    setNewDevice({ type: "", brand: "", model: "", condition: "", storage: "", ram: "", price: "", originalPrice: "", images: [] });
    onClose();
  };

  return (
    <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Device</DialogTitle>
        <DialogDescription className="text-gray-300">
          Add a device to the sales inventory with images
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-300">Device Type</Label>
            <Select value={newDevice.type} onValueChange={(value) => setNewDevice({...newDevice, type: value})}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="tv">TV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-gray-300">Brand</Label>
            <Input 
              value={newDevice.brand}
              onChange={(e) => setNewDevice({...newDevice, brand: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-300">Model</Label>
            <Input 
              value={newDevice.model}
              onChange={(e) => setNewDevice({...newDevice, model: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
          <div>
            <Label className="text-gray-300">Storage</Label>
            <Input 
              placeholder="e.g., 256GB or 55-inch" 
              value={newDevice.storage}
              onChange={(e) => setNewDevice({...newDevice, storage: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-300">RAM</Label>
            <Input 
              placeholder="e.g., 8GB (for laptops/phones)" 
              value={newDevice.ram}
              onChange={(e) => setNewDevice({...newDevice, ram: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
          <div>
            <Label className="text-gray-300">Condition</Label>
            <Select value={newDevice.condition} onValueChange={(value) => setNewDevice({...newDevice, condition: value})}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-300">Price (ZAR)</Label>
            <Input 
              type="number" 
              value={newDevice.price}
              onChange={(e) => setNewDevice({...newDevice, price: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
          <div>
            <Label className="text-gray-300">Original Price (ZAR)</Label>
            <Input 
              type="number" 
              value={newDevice.originalPrice}
              onChange={(e) => setNewDevice({...newDevice, originalPrice: e.target.value})}
              className="bg-gray-700 border-gray-600 text-white" 
            />
          </div>
        </div>
        <div>
          <Label className="text-gray-300">Device Images (up to 3)</Label>
          <div className="space-y-2">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-gray-700 border-gray-600 text-white"
            />
            {newDevice.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {newDevice.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Device ${index + 1}`} className="w-full h-20 object-cover rounded" />
                    <Button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 p-0 text-xs"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Button 
          onClick={handleAddDevice}
          className="w-full bg-lemon hover:bg-lemon-dark text-black"
        >
          Add Device
        </Button>
      </div>
    </DialogContent>
  );
};

export default AddDeviceModal;
