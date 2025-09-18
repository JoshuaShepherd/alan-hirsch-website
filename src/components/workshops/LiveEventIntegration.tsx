'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  PhoneOff,
  Users,
  MessageCircle,
  Share,
  Settings,
  Monitor,
  Calendar,
  Clock,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export interface WorkshopEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  timezone: string;
  platform: 'zoom' | 'teams' | 'meet';
  meetingId: string;
  passcode?: string;
  hostKey?: string;
  registrationRequired: boolean;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  recordingEnabled: boolean;
  chatEnabled: boolean;
  screenShareEnabled: boolean;
  breakoutRoomsEnabled: boolean;
  materials?: WorkshopMaterial[];
  facilitators: WorkshopFacilitator[];
  registrationUrl?: string;
  joinUrl?: string;
  dialInNumbers?: DialInInfo[];
}

export interface WorkshopMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'slides' | 'video' | 'audio' | 'link';
  url: string;
  description?: string;
  availableAt: 'before' | 'during' | 'after' | 'always';
  downloadable: boolean;
  size?: number;
}

export interface WorkshopFacilitator {
  id: string;
  name: string;
  email: string;
  role: 'host' | 'co-host' | 'facilitator' | 'observer';
  avatar?: string;
  bio?: string;
}

export interface DialInInfo {
  country: string;
  number: string;
  countryCode: string;
}

export interface LiveEventIntegrationProps {
  event: WorkshopEvent;
  onJoinEvent: (eventId: string) => void;
  onUpdateEvent: (eventId: string, updates: Partial<WorkshopEvent>) => void;
  userRole?: 'participant' | 'facilitator' | 'host';
}

export function LiveEventIntegration({ 
  event, 
  onJoinEvent, 
  onUpdateEvent, 
  userRole = 'participant' 
}: LiveEventIntegrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [deviceSettings, setDeviceSettings] = useState({
    camera: true,
    microphone: true,
    speaker: true
  });
  const [showSettings, setShowSettings] = useState(false);
  const [joinUrl, setJoinUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate platform-specific join URL
    generateJoinUrl();
  }, [event]);

  const generateJoinUrl = () => {
    switch (event.platform) {
      case 'zoom':
        setJoinUrl(`https://zoom.us/j/${event.meetingId}${event.passcode ? `?pwd=${event.passcode}` : ''}`);
        break;
      case 'teams':
        setJoinUrl(`https://teams.microsoft.com/l/meetup-join/${event.meetingId}`);
        break;
      case 'meet':
        setJoinUrl(`https://meet.google.com/${event.meetingId}`);
        break;
      default:
        setJoinUrl('');
    }
  };

  const handleJoinEvent = async () => {
    setIsLoading(true);
    setConnectionStatus('connecting');
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Open the meeting platform
      if (joinUrl) {
        window.open(joinUrl, '_blank');
      }
      
      setConnectionStatus('connected');
      onJoinEvent(event.id);
    } catch (error) {
      setConnectionStatus('error');
      console.error('Failed to join event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyJoinUrl = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlatformIcon = () => {
    switch (event.platform) {
      case 'zoom':
        return <Video className="h-5 w-5" />;
      case 'teams':
        return <MessageCircle className="h-5 w-5" />;
      case 'meet':
        return <Video className="h-5 w-5" />;
      default:
        return <Video className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (event.status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isEventLive = () => {
    const now = new Date();
    return now >= event.startTime && now <= event.endTime && event.status === 'live';
  };

  const isEventStartingSoon = () => {
    const now = new Date();
    const timeDiff = event.startTime.getTime() - now.getTime();
    return timeDiff > 0 && timeDiff <= 15 * 60 * 1000; // 15 minutes
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getPlatformIcon()}
            <div>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getStatusColor()}>
                  {event.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {event.platform}
                </Badge>
                {isEventLive() && (
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {(userRole === 'host' || userRole === 'facilitator') && (
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Event Settings</DialogTitle>
                </DialogHeader>
                <EventSettings event={event} onUpdateEvent={onUpdateEvent} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formatDate(event.startTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {formatTime(event.startTime)} - {formatTime(event.endTime)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {event.currentParticipants}
                {event.maxParticipants && ` / ${event.maxParticipants}`} participants
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Meeting ID:</span> {event.meetingId}
            </div>
            {event.passcode && (
              <div className="text-sm">
                <span className="font-medium">Passcode:</span> {event.passcode}
              </div>
            )}
            <div className="text-sm">
              <span className="font-medium">Platform:</span> 
              <span className="capitalize ml-1">{event.platform}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-muted-foreground">{event.description}</p>
        </div>

        {/* Connection Status */}
        {connectionStatus !== 'disconnected' && (
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
            {connectionStatus === 'connecting' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Connecting to event...</span>
              </>
            )}
            {connectionStatus === 'connected' && (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Connected successfully</span>
              </>
            )}
            {connectionStatus === 'error' && (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Connection failed. Please try again.</span>
              </>
            )}
          </div>
        )}

        {/* Join Controls */}
        <div className="space-y-4">
          {/* Device Settings */}
          <div className="flex items-center justify-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <Button
              variant={deviceSettings.camera ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceSettings(prev => ({ ...prev, camera: !prev.camera }))}
            >
              {deviceSettings.camera ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
            <Button
              variant={deviceSettings.microphone ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceSettings(prev => ({ ...prev, microphone: !prev.microphone }))}
            >
              {deviceSettings.microphone ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              variant={deviceSettings.speaker ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceSettings(prev => ({ ...prev, speaker: !prev.speaker }))}
            >
              {deviceSettings.speaker ? <Phone className="h-4 w-4" /> : <PhoneOff className="h-4 w-4" />}
            </Button>
          </div>

          {/* Join Button */}
          <div className="flex flex-col items-center space-y-3">
            {(isEventLive() || isEventStartingSoon()) ? (
              <Button 
                onClick={handleJoinEvent} 
                disabled={isLoading}
                size="lg"
                className="w-full max-w-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" />
                    Join Event
                  </>
                )}
              </Button>
            ) : (
              <Button disabled size="lg" className="w-full max-w-xs">
                <Clock className="h-4 w-4 mr-2" />
                Event Not Started
              </Button>
            )}

            {/* Join URL */}
            <div className="flex items-center space-x-2 text-sm">
              <Input 
                value={joinUrl} 
                readOnly 
                className="text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyJoinUrl}
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(joinUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Dial-in Information */}
        {event.dialInNumbers && event.dialInNumbers.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Dial-in Numbers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {event.dialInNumbers.map((dialIn, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="font-medium">{dialIn.country}:</span>
                  <span>{dialIn.number}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Facilitators */}
        {event.facilitators.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Facilitators</h4>
            <div className="flex flex-wrap gap-3">
              {event.facilitators.map((facilitator) => (
                <div key={facilitator.id} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {facilitator.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{facilitator.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{facilitator.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Event Settings Component for Hosts/Facilitators
function EventSettings({ 
  event, 
  onUpdateEvent 
}: { 
  event: WorkshopEvent; 
  onUpdateEvent: (eventId: string, updates: Partial<WorkshopEvent>) => void;
}) {
  const [settings, setSettings] = useState({
    recordingEnabled: event.recordingEnabled,
    chatEnabled: event.chatEnabled,
    screenShareEnabled: event.screenShareEnabled,
    breakoutRoomsEnabled: event.breakoutRoomsEnabled,
    maxParticipants: event.maxParticipants || 100
  });

  const handleSave = () => {
    onUpdateEvent(event.id, settings);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="recording">Enable Recording</Label>
          <Switch
            id="recording"
            checked={settings.recordingEnabled}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, recordingEnabled: checked }))}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="chat">Enable Chat</Label>
          <Switch
            id="chat"
            checked={settings.chatEnabled}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, chatEnabled: checked }))}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="screenshare">Enable Screen Share</Label>
          <Switch
            id="screenshare"
            checked={settings.screenShareEnabled}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, screenShareEnabled: checked }))}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="breakout">Enable Breakout Rooms</Label>
          <Switch
            id="breakout"
            checked={settings.breakoutRoomsEnabled}
            onCheckedChange={(checked) => setSettings(prev => ({ ...prev, breakoutRoomsEnabled: checked }))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxParticipants">Max Participants</Label>
          <Input
            id="maxParticipants"
            type="number"
            value={settings.maxParticipants}
            onChange={(e) => setSettings(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
          />
        </div>
      </div>
      
      <Button onClick={handleSave} className="w-full">
        Save Settings
      </Button>
    </div>
  );
}
